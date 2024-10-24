import { PDFDocument, PDFPage, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import robotoFontUrl from "./fonts/Roboto-Regular.ttf";
import { IndexedDB } from "../../IndexedDB";
import {
  BeltLightGlowShadeEnum,
  BeltLightLampStepEnum,
  beltLightRfp,
  BeltLightType,
  BoxPVSType,
  CommonItemType,
  CorrugationType,
  CurtainGlowModeEnum,
  CurtainSizeEnum,
  CurtainType,
  electricShieldRfp,
  ElectricShieldType,
  extraCorrBoxRfp,
  FringeCableEnum,
  FringeType,
  get_screeds_200_packs,
  get_Screeds_480_500_packs,
  getAllVagi,
  getBeltLightLength,
  getCorrPVSLength,
  getEsBoxPvs,
  getEsCorrPVS,
  getFringeLength,
  getNeonLength,
  getPVSLength,
  getRopeLength,
  getSolderBoxPieces,
  getThreadLength,
  montageRfp,
  MontageType,
  neonPaintingRfp,
  neonRfp,
  PVSColorEnum,
  pvsRfp,
  PVSType,
  RelaysSwitchesType,
  ropeRfp,
  RopeType,
  Screed_200_Type,
  Screed_480_500_Type,
  SolderBoxType,
  switchesRfp,
  threadBracingRFP,
  threadGlowMode,
  ThreadGlowModeEnum,
  ThreadGlowShadeEnum,
  threadRfp,
  ThreadType,
  VagiType,
} from "@/fsd/entities";
import { NeonType } from "@/fsd/entities/Neon/model";
import { splitPrice } from "@/fsd/shared";
import {
  FringeGlowModeEnum,
  FringeGlowShadeEnum,
  FringeLedEnum,
  fringeRfp,
} from "@/fsd/entities/Fringe";
import demoPDF from "./assets/demo.pdf";
import pdfIntro from "./assets/pdf_intro.png";
import { LineType } from "../model";
import { curtainRfp } from "@/fsd/entities/Curtain/lib/rfpAlgs";

type PositionsType = Array<{
  name: string;
  items: Array<LineType>;
}>;

export async function generateRFP(
  idb: IndexedDB,
  measureId: string,
  download: boolean = true
) {
  const positions: PositionsType = [];

  await getPositions(measureId);

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // Подключаем шрифт
  const robotoFontBytes = await fetch(robotoFontUrl).then((res) =>
    res.arrayBuffer()
  );
  const robotoFont = await pdfDoc.embedFont(robotoFontBytes);

  const pageWidth = 540; // ширина A4
  const pageHeight = 720; // высота A4
  const margin = 22.36;
  const lineHeight = 8;
  const dividerHeight = 1; // Толщина разделителя
  const orderId_width = 34.1572;
  const desc_width = 256.179;
  const unit_width = 34.1572;
  const quantity_width = 34.1572;
  const price_width = 68.3144;
  const cost_width = 68.3144;
  const verticalTablePadding = 10;
  const horizontalTablePadding = 6;
  const fontSize = 7;

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  drawPageBackground(currentPage, pageWidth, pageHeight);

  const introImgBytes = await fetch(pdfIntro.src).then((res) =>
    res.arrayBuffer()
  );
  const introImg = await pdfDoc.embedPng(introImgBytes);
  currentPage.drawImage(introImg, {
    x: 0,
    y: pageHeight - 360,
    width: pageWidth,
    height: 360,
  });

  currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  const { width, height } = currentPage.getSize();
  drawPageBackground(currentPage, width, height);
  let yPosition = pageHeight - margin;
  let xPosition = margin;

  const table_header: LineType = {
    id: "Номер п/п",
    desc: "Наименование оборудования",
    unit: "Ед. изм.",
    quantity: "Кол-во",
    price: "Цена",
    cost: "Стоимость",
  };

  let yOffset = 0;

  yOffset = writeRow(table_header);

  positions.forEach((pos) => {
    xPosition = margin;
    yPosition -= yOffset;
    if (yPosition <= margin) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      const { width, height } = currentPage.getSize();
      drawPageBackground(currentPage, width, height);
      yPosition = pageHeight - margin;
    }
    yOffset = writeObjectType(pos.name);
    pos.items.forEach((item) => {
      yPosition -= yOffset;
      xPosition = margin;
      if (yPosition <= margin) {
        currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
        const { width, height } = currentPage.getSize();
        drawPageBackground(currentPage, width, height);
        yPosition = pageHeight - margin;
      }
      const splittedItem: LineType = {
        ...item,
        price: splitPrice(parseInt(item.price)),
        cost: splitPrice(parseInt(item.cost)),
      };
      if (item.id) {
        yOffset = writeRow(splittedItem);
      } else {
        yOffset = writeOverall(splittedItem, "Итого");
      }
    });
  });

  yPosition -= yOffset;
  xPosition = margin;

  yOffset = writeOverall(
    {
      id: "",
      desc: "",
      unit: "",
      quantity: "",
      price: "",
      cost: splitPrice(getTotal()),
    },
    "Всего"
  );

  if (download) {
    const demoPdfBytes = await fetch(demoPDF).then((res) => res.arrayBuffer());
    const demoDoc = await PDFDocument.load(demoPdfBytes);
    const demoPages = demoDoc.getPages();
    const totalDemoPages = demoPages.length;
    const lastPages = await pdfDoc.copyPages(demoDoc, [
      totalDemoPages - 3,
      totalDemoPages - 2,
      totalDemoPages - 1,
    ]);
    lastPages.forEach((page) => pdfDoc.addPage(page));
    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

    const aEl = document.createElement("a");
    aEl.href = pdfDataUri;
    aEl.download = "КП";
    aEl.click();
  } else {
    return getTotal();
  }

  function getTotal() {
    let overall = 0;

    if (!positions.length) return overall;

    positions.forEach((pos) => {
      pos.items.forEach((item) => {
        if (parseInt(item.id)) {
          overall += parseInt(item.cost);
        }
      });
    });
    return overall;
  }

  function writeRow(row: LineType) {
    drawDivider(margin, pageWidth - margin, yPosition, yPosition);

    const { lines: orderIdLines, maxWidthLine: maxLineOrderId } =
      splitTextIntoLines(row.id, robotoFont, fontSize, orderId_width);
    const { lines: descLines, maxWidthLine: maxLineDesc } = splitTextIntoLines(
      row.desc,
      robotoFont,
      fontSize,
      desc_width
    );
    const { lines: unitLines, maxWidthLine: maxLineUnit } = splitTextIntoLines(
      row.unit,
      robotoFont,
      fontSize,
      unit_width
    );
    const { lines: quantityLines, maxWidthLine: maxLineQuantity } =
      splitTextIntoLines(row.quantity, robotoFont, fontSize, quantity_width);
    const { lines: priceLines, maxWidthLine: maxLinePrice } =
      splitTextIntoLines(row.price, robotoFont, fontSize, price_width);
    const { lines: costLines, maxWidthLine: maxLineCost } = splitTextIntoLines(
      row.cost,
      robotoFont,
      fontSize,
      cost_width
    );

    const maxHeightText = Math.max(
      orderIdLines.length * lineHeight,
      descLines.length * lineHeight,
      unitLines.length * lineHeight,
      quantityLines.length * lineHeight,
      priceLines.length * lineHeight,
      costLines.length * lineHeight
    );

    const bottomLineY = yPosition - 2 * verticalTablePadding - maxHeightText;

    drawDivider(margin, pageWidth - margin, bottomLineY, bottomLineY);

    let xVertical = xPosition;
    for (let i = 0; i < 7; i++) {
      drawDivider(xVertical, xVertical, yPosition, bottomLineY);
      switch (i) {
        case 0:
          xVertical += orderId_width;
          break;
        case 1:
          xVertical += desc_width;
          break;
        case 2:
          xVertical += unit_width;
          break;
        case 3:
          xVertical += quantity_width;
          break;
        case 4:
          xVertical += price_width;
          break;
        case 5:
          xVertical += cost_width;
          break;
        default:
          break;
      }
    }

    const cellHeight = Math.abs(bottomLineY - yPosition);

    drawCell(
      orderIdLines,
      xPosition,
      maxLineOrderId,
      orderId_width,
      orderIdLines.length * lineHeight,
      cellHeight
    );
    xPosition += orderId_width;

    drawCell(
      descLines,
      xPosition,
      maxLineDesc,
      desc_width,
      descLines.length * lineHeight,
      cellHeight
    );
    xPosition += desc_width;

    drawCell(
      unitLines,
      xPosition,
      maxLineUnit,
      unit_width,
      unitLines.length * lineHeight,
      cellHeight
    );
    xPosition += unit_width;

    drawCell(
      quantityLines,
      xPosition,
      maxLineQuantity,
      quantity_width,
      quantityLines.length * lineHeight,
      cellHeight
    );
    xPosition += quantity_width;

    drawCell(
      priceLines,
      xPosition,
      maxLinePrice,
      price_width,
      priceLines.length * lineHeight,
      cellHeight
    );
    xPosition += price_width;

    drawCell(
      costLines,
      xPosition,
      maxLineCost,
      cost_width,
      costLines.length * lineHeight,
      cellHeight
    );

    return cellHeight;
  }

  function writeObjectType(name: string) {
    drawDivider(margin, pageWidth - margin, yPosition, yPosition);

    const { lines: nameLines, maxWidthLine: nameTextWidth } =
      splitTextIntoLines(name, robotoFont, fontSize, pageWidth - 2 * margin);

    const nameHeight = nameLines.length * lineHeight;

    const bottomLineY = yPosition - 2 * verticalTablePadding - nameHeight;

    drawDivider(margin, pageWidth - margin, bottomLineY, bottomLineY);

    drawDivider(margin, margin, yPosition, bottomLineY);
    drawDivider(pageWidth - margin, pageWidth - margin, yPosition, bottomLineY);

    const cellHeight = Math.abs(bottomLineY - yPosition);

    drawCell(
      nameLines,
      xPosition,
      nameTextWidth,
      pageWidth - 2 * margin,
      nameHeight,
      cellHeight
    );
    return cellHeight;
  }

  function writeOverall(overall: LineType, text: string) {
    drawDivider(margin, pageWidth - margin, yPosition, yPosition);

    const yBottom = yPosition - 2 * verticalTablePadding - lineHeight;

    drawDivider(margin, pageWidth - margin, yBottom, yBottom);

    const dividerX = pageWidth - margin - cost_width;

    drawDivider(dividerX, dividerX, yPosition, yBottom);
    drawDivider(margin, margin, yPosition, yBottom);
    drawDivider(pageWidth - margin, pageWidth - margin, yPosition, yBottom);

    const textWidth = robotoFont.widthOfTextAtSize(text, fontSize);

    const cellHeight = Math.abs(yBottom - yPosition);

    const yTextPos = yPosition + (lineHeight - cellHeight) / 2 - fontSize;
    const xTextPos = dividerX - textWidth - horizontalTablePadding;

    currentPage.drawText(text, {
      x: xTextPos,
      y: yTextPos,
      size: fontSize,
      font: robotoFont,
      color: rgb(0, 0, 0),
    });

    const { lines, maxWidthLine } = splitTextIntoLines(
      overall.cost,
      robotoFont,
      fontSize,
      cost_width
    );

    xPosition = pageWidth - margin - cost_width;
    drawCell(
      [`${overall.cost}`],
      xPosition,
      maxWidthLine,
      cost_width,
      lines.length * lineHeight,
      cellHeight
    );

    return cellHeight;
  }

  function drawDivider(x1: number, x2: number, y1: number, y2: number) {
    currentPage.drawLine({
      start: { x: x1, y: y1 },
      end: { x: x2, y: y2 },
      thickness: dividerHeight,
      color: rgb(0.5, 0.5, 0.5), // серая линия
    });
  }

  function drawCell(
    lines: string[],
    xPosition: number,
    textWidth: number,
    cellWidth: number,
    textHeight: number,
    cellHeight: number
  ) {
    let yTextPos = yPosition + (textHeight - cellHeight) / 2 - fontSize;
    let xTextPos = xPosition + (cellWidth - textWidth) / 2;

    lines.forEach((line) => {
      currentPage.drawText(line, {
        x: xTextPos,
        y: yTextPos,
        size: fontSize,
        font: robotoFont,
        color: rgb(0, 0, 0),
      });
      yTextPos -= lineHeight;
    });
  }

  function splitTextIntoLines(
    text: string,
    font: any,
    fontSize: number,
    maxWidth: number
  ): {
    lines: string[];
    maxWidthLine: number;
  } {
    const words = text.split(" ");
    let lines: string[] = [];
    let currentLine = "";
    let maxWidthLine = 0;
    const paddingMaxWidth = maxWidth - horizontalTablePadding * 2;

    words.forEach((word) => {
      const lineWithWord = currentLine ? `${currentLine} ${word}` : word;
      const lineWidth = font.widthOfTextAtSize(lineWithWord, fontSize);

      if (lineWidth < paddingMaxWidth) {
        currentLine = lineWithWord;
      } else {
        lines.push(currentLine);
        const lineWidth = font.widthOfTextAtSize(currentLine, fontSize);
        if (lineWidth > maxWidthLine) maxWidthLine = lineWidth;
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine); // Добавляем последнюю строку
      const lineWidth = font.widthOfTextAtSize(currentLine, fontSize);
      if (lineWidth > maxWidthLine) maxWidthLine = lineWidth;
    }

    lines = lines.filter((line) => line);

    return {
      lines: lines,
      maxWidthLine,
    };
  }

  function drawPageBackground(page: PDFPage, width: number, height: number) {
    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height,
      color: rgb(248 / 255, 248 / 255, 248 / 255),
    });
  }

  async function getPositions(measureId: string) {
    const measure = (await idb.measures.getAll()).find(
      (measure) => measure.id === measureId
    );

    if (measure) {
      const objects = await idb.objects.getOwn(measure.id);

      await new Promise<void>((resolve) => {
        objects.forEach(async (object, index) => {
          const items = await idb.items.getOwn(object.id);
          const i =
            positions.push({
              name: object.title,
              items: [],
            }) - 1;

          let startId = 1;

          fringeRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          threadRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          beltLightRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          neonRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          curtainRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          positions[i].items.push(electricShieldRfp(items, startId));
          startId++;

          positions[i].items.push({
            id: startId.toString(),
            desc: `Расходные материалы для монтажа  (стяжки, блоки питания для бахромы или сетевые шнуры для неона, выключатель 1/2кл, кабель ПВС до 20 метров в кабель-канале или гофре, распаячная коробка, термоусадка в местах соединения)`,
            unit: "шт",
            quantity: "1",
            price: "6840",
            cost: "6840",
          });
          startId++;

          pvsRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          extraCorrBoxRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          switchesRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          montageRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          ropeRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          threadBracingRFP(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          neonPaintingRfp(items, startId).forEach((el) => {
            positions[i].items.push(el);
            startId++;
          });

          const cost = positions[i].items.reduce(
            (sum, item) => (sum += parseFloat(item.cost)),
            0
          );
          positions[i].items.push({
            id: "",
            desc: "Итого",
            unit: "",
            quantity: `0`,
            price: `0`,
            cost: `${cost} Р`,
          });
          if (objects.length - 1 === index) {
            resolve();
          }
        });
      });
    }
  }
}
