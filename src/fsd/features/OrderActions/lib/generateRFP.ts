import { PDFDocument, PDFPage, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import robotoFontUrl from "./fonts/Roboto-Regular.ttf";
import { IndexedDB } from "../../IndexedDB";
import {
  BeltLightGlowShadeEnum,
  BeltLightLampStepEnum,
  BeltLightType,
  BoxPVSType,
  CommonItemType,
  CorrugationType,
  CurtainGlowModeEnum,
  CurtainSizeEnum,
  CurtainType,
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
  PVSColorEnum,
  PVSType,
  RelaysSwitchesType,
  RopeType,
  Screed_200_Type,
  Screed_480_500_Type,
  SolderBoxType,
  threadGlowMode,
  ThreadGlowModeEnum,
  ThreadGlowShadeEnum,
  ThreadType,
  VagiType,
} from "@/fsd/entities";
import { NeonType } from "@/fsd/entities/Neon/model";
import { splitPrice } from "@/fsd/shared";
import {
  FringeGlowModeEnum,
  FringeGlowShadeEnum,
  FringeLedEnum,
} from "@/fsd/entities/Fringe";
import demoPDF from "./assets/demo.pdf";
import pdfIntro from "./assets/pdf_intro.png";

type LineType = {
  id: string;
  desc: string;
  unit: string;
  quantity: string;
  price: string;
  cost: string;
};

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
        yOffset = writeOverall(splittedItem);
      }
    });
  });

  if (download) {
    const demoPdfBytes = await fetch(demoPDF).then((res) => res.arrayBuffer());
    const demoDoc = await PDFDocument.load(demoPdfBytes);
    const demoPages = demoDoc.getPages();
    console.log("size of demo", demoPages[0].getSize());
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

  function writeOverall(overall: LineType) {
    drawDivider(margin, pageWidth - margin, yPosition, yPosition);

    const yBottom = yPosition - 2 * verticalTablePadding - lineHeight;

    drawDivider(margin, pageWidth - margin, yBottom, yBottom);

    const dividerX = pageWidth - margin - cost_width;

    drawDivider(dividerX, dividerX, yPosition, yBottom);
    drawDivider(margin, margin, yPosition, yBottom);
    drawDivider(pageWidth - margin, pageWidth - margin, yPosition, yBottom);

    const text = "Итого";

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

  async function getPositions(measureId: string) {
    const measure = (await idb.measures.getAll()).find(
      (measure) => measure.id === measureId
    );

    if (measure) {
      const objects = await idb.objects.getOwn(measure.id);

      await new Promise<void>((resolve) => {
        objects.forEach(async (object, index) => {
          let itemId = 1;
          const items = await idb.items.getOwn(object.id);
          let consumablesCost = 0;
          const i =
            positions.push({
              name: object.title,
              items: [],
            }) - 1;

          items.forEach((item) => {
            const { desc, unit, quantity, price, cost } = getItemDesc(
              item,
              items
            );
            if (desc && cost) {
              const newItem = {
                id: itemId.toString(),
                desc,
                unit,
                quantity: quantity.toString(),
                price: `${price} Р`,
                cost: `${cost} Р`,
              };
              positions[i].items.push(newItem);
              itemId++;
              if (item.itemTitle === "Гибкий неон") {
                const neon = item.item as NeonType;
                if (neon.painting) {
                  const price = 350;
                  const quantity = getNeonLength(neon.length).skeinMeters;
                  positions[i].items.push({
                    id: itemId.toString(),
                    desc: `Покраска профиля алюминиевого для неона гибкого ${neon.thickness}`,
                    unit: "м.п.",
                    quantity: quantity.toString(),
                    price: `${price} Р`,
                    cost: `${price * quantity} Р`,
                  });
                  itemId++;
                }
              }
            } else {
              consumablesCost += cost;
            }
          });

          let price = 7450;
          let quantity = 1;
          if (i === 0)
            positions[i].items.push({
              id: `${itemId}`,
              desc: `Монтаж щита уличного IP65 в сборе (автомат 10А, реле напряжения) и протяжка питания для подключения оборудования, коммутация, настройка`,
              unit: "шт",
              quantity: "1",
              price: `${price} Р`,
              cost: `${quantity * price} Р`,
            });

          positions[i].items.push({
            id: `${itemId + 1}`,
            desc: "Расходные материалы для монтажа (стяжки, автомат 10A, реле напряжения 63A, выключатель 1/2кл, кабель ПВС до 20 метров в кабель-канале или гофре, распаечная коробка, термоусадка в местах соединения)",
            unit: "%",
            price: `${consumablesCost} Р`,
            cost: `${consumablesCost} Р `,
            quantity: `1`,
          });

          quantity = getPVSLength(items);
          price = 250;
          if (quantity > 20)
            positions[i].items.push({
              id: `${itemId + 2}`,
              desc: `Монтаж кабеля ПВС 2х1,5 свыше 20 п.м.`,
              unit: "м.п.",
              quantity: quantity.toString(),
              price: `${price} Р`,
              cost: `${quantity * price} Р`,
            });

          quantity =
            parseInt(getEsCorrPVS(items).keyValue) +
            parseInt(getEsBoxPvs(items).keyValue);
          price = 250;

          if (quantity > 20)
            positions[i].items.push({
              id: `${itemId + 3}`,
              desc: `Монтаж гофры или кабель-канала свыше 20 п.м.`,
              unit: "м.п.",
              quantity: quantity.toString(),
              price: `${price} Р`,
              cost: `${quantity * price} Р`,
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

function getItemDesc(
  itemObj: CommonItemType,
  allItems: CommonItemType[]
): {
  desc: string;
  unit: string;
  quantity: number;
  price: number;
  cost: number;
} {
  switch (itemObj.itemTitle) {
    case "Бахрома": {
      let fringe = itemObj.item as FringeType;
      const fringeMeters = getFringeLength(fringe.length).skeinMeters;
      let desc = `Монтаж бахромы${
        fringe.led === FringeLedEnum.led_200 ? '" ПРЕМИУМ "' : " "
      }светодиодной. Класс защиты IP65. Материал провода каучук.`;
      if (fringe.cable === FringeCableEnum.Black) desc += " Черный провод.";
      if (fringe.cable === FringeCableEnum.White) desc += " Белый провод.";
      if (fringe.glowShade === FringeGlowShadeEnum.RGB) desc += " RGB";
      if (fringe.glowShade === FringeGlowShadeEnum.Warm) desc += " Теплый свет";
      if (fringe.glowShade === FringeGlowShadeEnum.Cold)
        desc += " Холодный свет";
      if (
        fringe.glowMode === FringeGlowModeEnum.Static_glow &&
        fringe.glowShade !== FringeGlowShadeEnum.RGB
      )
        desc += " статика";
      if (
        fringe.glowMode === FringeGlowModeEnum.Flickering &&
        fringe.glowShade !== FringeGlowShadeEnum.RGB
      )
        desc += " с холодным мерцанием";

      let price = 2400;
      if (fringe.led === FringeLedEnum.led_200) price = 2700;
      return {
        desc,
        unit: "м.п",
        quantity: fringeMeters,
        price,
        cost: fringeMeters * fringe.price,
      };
    }
    case "Гибкий неон": {
      let neon = itemObj.item as NeonType;
      const neonMeters = getNeonLength(neon.length).skeinMeters;
      let desc = `Монтаж неона гибкого светодиодного. Размер ${neon.thickness}. Класс защиты IP76. Cвечение на выбор + Монтаж профиля алюминиевого для неона гибкого ${neon.thickness}`;
      return {
        desc,
        unit: "м.п",
        quantity: neonMeters,
        price: 21000,
        cost: neonMeters * neon.price,
      };
    }
    case "Нить": {
      let thread = itemObj.item as ThreadType;
      const threadMeters = getThreadLength(thread.length).skeinMeters;
      let desc = `Монтаж нити светодиодной. Класс защиты IP65. Материал провода каучук.`;
      if (thread.cable === PVSColorEnum.Black) desc += " Черный провод.";
      if (thread.cable === PVSColorEnum.White) desc += " Белый провод.";
      if (thread.glowShade === ThreadGlowShadeEnum.RGB) desc += " RGB.";
      if (thread.glowShade === ThreadGlowShadeEnum.Warm) desc += " Теплый свет";
      if (thread.glowShade === ThreadGlowShadeEnum.Cold)
        desc += " Холодный свет";
      if (thread.glowShade === ThreadGlowShadeEnum.colors_7)
        desc += " 7 цветов разные режимы мерцания.";
      if (
        thread.glowMode === ThreadGlowModeEnum.Flickering &&
        thread.glowShade !== ThreadGlowShadeEnum.RGB &&
        thread.glowShade !== ThreadGlowShadeEnum.colors_7
      )
        desc += " с холодным мерцанием.";
      if (
        thread.glowMode === ThreadGlowModeEnum.Static_glow &&
        thread.glowShade !== ThreadGlowShadeEnum.RGB &&
        thread.glowShade !== ThreadGlowShadeEnum.colors_7
      )
        desc += " статика.";
      desc += " Кратно 10м";

      return {
        desc: desc,
        unit: "м.п",
        quantity: threadMeters,
        price: 550,
        cost: threadMeters * thread.price,
      };
    }
    case "Белт-лайт": {
      let beltLight = itemObj.item as BeltLightType;
      const beltLightMeters = getBeltLightLength(beltLight.length).skeinMeters;
      let desc =
        "Монтаж светодиодной гирлянды Белт-лайт. Шаг между цоколями - ";
      if (beltLight.lampStep === BeltLightLampStepEnum.cm_20) desc += "20см.";
      if (beltLight.lampStep === BeltLightLampStepEnum.cm_40) desc += "40см.";
      desc += " Цоколь e27. Мощность лампочки 2Вт. Класс защиты IP65.";
      if (beltLight.cable === PVSColorEnum.Black) desc += " Черный провод,";
      if (beltLight.cable === PVSColorEnum.White) desc += " Белый провод,";
      if (
        beltLight.glowShade === BeltLightGlowShadeEnum.Cold &&
        BeltLightGlowShadeEnum.Blue &&
        BeltLightGlowShadeEnum.Filament
      )
        desc += " холодное свечение лампочек";
      if (
        beltLight.glowShade === BeltLightGlowShadeEnum.Warm &&
        BeltLightGlowShadeEnum.Red &&
        BeltLightGlowShadeEnum.Green
      )
        desc += " теплое свечение лампочек";
      let price = 2200;
      if (beltLight.lampStep === BeltLightLampStepEnum.cm_20) price = 4400;
      return {
        desc,
        unit: "м.п",
        quantity: beltLightMeters,
        price,
        cost: beltLightMeters * beltLight.price,
      };
    }
    case "Занавес": {
      let curtain = itemObj.item as CurtainType;
      let desc = `Монтаж занавеса ${curtain.size}, 220 В. Класс защиты IP65. Цвет провода и свечение на выбор. Блок питания входит в комплект`;
      let price = 0;
      if (curtain.size === CurtainSizeEnum.s_2_1) price = 9614;
      if (curtain.size === CurtainSizeEnum.s_2_1d5) price = 13046;
      if (curtain.size === CurtainSizeEnum.s_2_2) price = 18359;
      if (curtain.size === CurtainSizeEnum.s_2_3) price = 22198;
      if (curtain.size === CurtainSizeEnum.s_2_6) price = 28160;
      if (curtain.size === CurtainSizeEnum.s_2_9) price = 38742;
      return {
        desc,
        unit: "шт",
        quantity: curtain.quantity,
        price,
        cost: curtain.quantity * price,
      };
    }
    case "Ваги (клемма)": {
      const vagi = itemObj.item as VagiType;
      const allVagi = getAllVagi(allItems);
      return {
        desc: ``,
        unit: ``,
        quantity: 0,
        price: 0,
        cost: allVagi * vagi.price,
      };
    }
    case "Распаячная коробка": {
      const solderBox = itemObj.item as SolderBoxType;
      const solderBoxQuantity = parseInt(getSolderBoxPieces(allItems).keyValue);
      return {
        desc: ``,
        unit: ``,
        quantity: 0,
        price: 0,
        cost: solderBox.price * solderBoxQuantity,
      };
    }
    case "Стяжка 200мм": {
      const screeds = itemObj.item as Screed_200_Type;
      let screedsPacks = 0;
      get_screeds_200_packs(allItems).forEach((screed) => {
        screedsPacks += parseInt(screed.keyValue);
      });
      return {
        desc: ``,
        unit: ``,
        quantity: 0,
        price: 0,
        cost: screedsPacks * screeds.price,
      };
    }
    case "Стяжка 480-500мм": {
      const screeds = itemObj.item as Screed_480_500_Type;
      let screedsPacks = 0;
      get_Screeds_480_500_packs(allItems).forEach((screed) => {
        screedsPacks += parseInt(screed.keyValue);
      });
      return {
        desc: ``,
        unit: ``,
        quantity: 0,
        price: 0,
        cost: screedsPacks * screeds.price,
      };
    }
    case "Реле и выключатели": {
      const switches = itemObj.item as RelaysSwitchesType;
      const cost =
        switches.wired_price * switches.wired +
        switches.wirelessRadio_price * switches.wirelessRadio_price +
        switches.wirelessWifi_price * switches.wirelessWifi_price +
        switches.astroRelay_price * switches.astroRelay;
      return {
        desc: ``,
        unit: ``,
        quantity: 0,
        price: 0,
        cost,
      };
    }

    default: {
      return {
        desc: ``,
        unit: ``,
        quantity: 0,
        price: 0,
        cost: 0,
      };
    }
  }
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
