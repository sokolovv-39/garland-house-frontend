import { PDFDocument, rgb } from "pdf-lib";
import { IndexedDB } from "../../IndexedDB";
import {
  BeltLightType,
  BoxPVSType,
  CommonItemType,
  CorrugationType,
  CurtainType,
  FringeType,
  getFringeBracketsPacks,
  getCorrPVSLength,
  getFringeLength,
  PVSType,
  RopeType,
  ThreadType,
  getNeonLength,
  getNeonProfile,
  getThreadLength,
  getBeltLightLength,
  getPVSLength,
  FringeSurfaceEnum,
  ThreadBracingEnum,
  getThreadScreedsPacks,
  getRopeLength,
  getRopeRings,
  getRopeLanyards,
  getRopeDuplexClamps,
  ThreadSurfaceEnum,
  ThreadExtensionMultEnum,
  CurtainBracingEnum,
  CurtainSurfaceEnum,
  getCurtainScreedsPacks,
  CurtainCableEnum,
  CurtainExtensionMultEnum,
  RopeThicknessEnum,
  RopeSurfaceEnum,
  getCorrPVSClips,
  getBoxPVSPieces,
  SolderBoxType,
  getSolderBoxPieces,
  getAllVagi,
  get_Screed_200_packs,
  get_Screeds_480_500_quantity,
  getVagiModel,
  ThreadWireEnum,
  FringeBracingEnum,
} from "@/fsd/entities";
import fontkit from "@pdf-lib/fontkit";
import { NeonType } from "@/fsd/entities/Neon/model";
import { getBeltLightLamps } from "@/fsd/entities/BeltLight/lib/estimateAlgs";
import {
  FringeExtensionColorEnum,
  FringeExtensionMultEnum,
  FringeTeeColourEnum,
} from "@/fsd/entities/Fringe";
import { getRelaysSwitches } from "@/fsd/entities/RelaysSwitches/lib/estimateAlgs";
import { WritingArrayType } from "../model";
import robotoFontUrl from "./fonts/Roboto-Regular.ttf";

export async function generateEstimate(idb: IndexedDB, orderId: IDBValidKey) {
  const allItems = await getItems(idb, orderId);

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // Подключаем шрифт
  const robotoFontBytes = await fetch(robotoFontUrl).then((res) =>
    res.arrayBuffer()
  );
  const robotoFont = await pdfDoc.embedFont(robotoFontBytes);

  const pageWidth = 595.28; // ширина A4
  const pageHeight = 841.89; // высота A4
  const margin = 50;
  const contentWidth = pageWidth - 2 * margin;
  const maxDescWidth = contentWidth * 0.7; // 70% от ширины для desc
  const lineHeight = 20;
  const dividerHeight = 1; // Толщина разделителя

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
  let yPosition = pageHeight - margin;

  // Позиции в смете
  let cableBracketPacks = 0;
  let rope_2mm_length = 0;
  let screw_ring_4x50 = 0;
  let anchor_ring_6x50 = 0;
  let lanyard = 0;
  let duplex_clamp = 0;
  let white_extensions_1m = 0;
  let white_extensions_3m = 0;
  let white_extensions_5m = 0;
  let white_extensions_10m = 0;
  let black_extensions_1m = 0;
  let black_extensions_3m = 0;
  let black_extensions_5m = 0;
  let black_extensions_10m = 0;
  let black_tee = 0;
  let white_tee = 0;
  let powerQuantity = 0;
  let metal_profile = 0;
  let connecting_needles = 0;
  let plugs = 0;
  let screedsPacks = 0;
  let lamps = 0;
  let rope_3mm_length = 0;
  let white_screeds_480_500mm_packs = 0;
  let black_screeds_480_500mm_packs = 0;
  let corr_clips = 0;
  let street_shield_ip65 = 1;
  let automat_10A = 1;
  let voltage_relay = 1;
  let {
    wired: ordinary_wired_switch,
    wirelessRadio: wireless_switch_radio,
    wirelessWifi: wireless_switch_wifi,
    astroRelay,
  } = getRelaysSwitches(allItems);
  const vagi = getAllVagi(allItems);
  const screeds_200 = get_Screed_200_packs(allItems);
  const screeds_480_500 = get_Screeds_480_500_quantity(allItems);

  const writingArray: WritingArrayType = [];

  allItems.forEach((item) => {
    const writtenItem = getItemEstimateInfo(
      item,
      allItems,
      cableBracketPacks,
      rope_2mm_length,
      screw_ring_4x50,
      anchor_ring_6x50,
      lanyard,
      duplex_clamp,
      white_extensions_1m,
      white_extensions_3m,
      white_extensions_5m,
      white_extensions_10m,
      black_extensions_1m,
      black_extensions_3m,
      black_extensions_5m,
      black_extensions_10m,
      white_tee,
      black_tee,
      powerQuantity,
      metal_profile,
      connecting_needles,
      plugs,
      screedsPacks,
      lamps,
      rope_3mm_length,
      white_screeds_480_500mm_packs,
      black_screeds_480_500mm_packs,
      corr_clips
    );
    writingArray.push({
      desc: writtenItem.desc,
      keyValue: writtenItem.keyValue,
    });
  });

  getPositionsEstimateInfo(writingArray);

  writingArray.forEach((item) => writeItem(item.desc, item.keyValue));

  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

  const aEl = document.createElement("a");
  aEl.href = pdfDataUri;
  aEl.download = "Смета";
  aEl.click();

  function writeItem(desc: string, keyValue: string) {
    if (keyValue[0] === "0") return;

    const descLines = splitTextIntoLines(desc, robotoFont, 12, maxDescWidth); // Автоматический перенос текста desc

    function splitTextIntoLines(
      text: string,
      font: any,
      fontSize: number,
      maxWidth: number
    ): string[] {
      const words = text.split(" ");
      let lines: string[] = [];
      let currentLine = "";

      words.forEach((word) => {
        const lineWithWord = currentLine ? `${currentLine} ${word}` : word;
        const lineWidth = font.widthOfTextAtSize(lineWithWord, fontSize);

        if (lineWidth < maxWidth) {
          currentLine = lineWithWord;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      });

      if (currentLine) {
        lines.push(currentLine); // Добавляем последнюю строку
      }

      return lines;
    }

    const descHeight = descLines.length * lineHeight; // Высота блока с текстом desc

    // Проверяем, если текст и разделитель не умещаются на странице
    if (yPosition - descHeight - lineHeight < margin) {
      currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
      yPosition = pageHeight - margin;
    }

    // Рисуем строки desc
    descLines.forEach((line, index) => {
      currentPage.drawText(line, {
        x: margin,
        y: yPosition,
        size: 12,
        font: robotoFont,
        color: rgb(0, 0, 0),
      });
      if (index !== descLines.length - 1) {
        yPosition -= lineHeight;
      }
    });

    // Рисуем keyValue
    let keyValueYPosition;

    if (descLines.length === 1) keyValueYPosition = yPosition;
    else
      keyValueYPosition =
        yPosition + (descLines.length * lineHeight) / 2 - lineHeight / 2;
    currentPage.drawText(keyValue, {
      x: pageWidth - margin - robotoFont.widthOfTextAtSize(keyValue, 12),
      y: keyValueYPosition,
      size: 12,
      font: robotoFont,
      color: rgb(0, 0, 0),
    });

    // Рисуем разделитель после текста
    yPosition -= lineHeight / 2;
    drawDivider(currentPage, yPosition);
    // Функция для рисования разделителя
    function drawDivider(page: any, y: number) {
      page.drawLine({
        start: { x: margin, y },
        end: { x: pageWidth - margin, y },
        thickness: dividerHeight,
        color: rgb(0.5, 0.5, 0.5), // серая линия
      });
    }
    yPosition -= lineHeight; // Зазор после разделителя
  }

  function getPositionsEstimateInfo(writingArray: WritingArrayType) {
    writingArray.push({
      desc: `Скоба кабельная`,
      keyValue: `${cableBracketPacks} уп`,
    });
    writingArray.push({
      desc: `Трос / 2 мм`,
      keyValue: `${rope_2mm_length} м`,
    });
    writingArray.push({
      desc: `Шуруп-кольцо / 4x50`,
      keyValue: `${screw_ring_4x50} шт`,
    });
    writingArray.push({
      desc: `Анкер-кольцо / 6x50`,
      keyValue: `${anchor_ring_6x50} шт`,
    });
    writingArray.push({
      desc: `Талреп`,
      keyValue: `${lanyard} шт`,
    });
    writingArray.push({
      desc: `Дуплексный зажим`,
      keyValue: `${duplex_clamp} шт`,
    });
    writingArray.push({
      desc: `Удлинитель / 1 м / белый`,
      keyValue: `${white_extensions_1m} шт`,
    });
    writingArray.push({
      desc: `Удлинитель / 3 м / белый`,
      keyValue: `${white_extensions_3m} шт`,
    });
    writingArray.push({
      desc: `Удлинитель / 5 м / белый`,
      keyValue: `${white_extensions_5m} шт`,
    });
    writingArray.push({
      desc: `Удлинитель / 10 м / белый`,
      keyValue: `${white_extensions_10m} шт`,
    });
    writingArray.push({
      desc: `Удлинитель / 1 м / черный`,
      keyValue: `${black_extensions_1m} шт`,
    });
    writingArray.push({
      desc: `Удлинитель / 3 м / черный`,
      keyValue: `${black_extensions_3m} шт`,
    });
    writingArray.push({
      desc: `Удлинитель / 5 м / черный`,
      keyValue: `${black_extensions_5m} шт`,
    });
    writingArray.push({
      desc: `Удлинитель / 10 м / черный`,
      keyValue: `${black_extensions_10m} шт`,
    });
    writingArray.push({
      desc: `Тройник / черный`,
      keyValue: `${black_tee} шт`,
    });
    writingArray.push({
      desc: `Тройник / белый`,
      keyValue: `${white_tee} шт`,
    });
    writingArray.push({
      desc: `Блок питания`,
      keyValue: `${powerQuantity} шт`,
    });
    writingArray.push({
      desc: `Профиль металлический / 2 м`,
      keyValue: `${metal_profile} шт`,
    });
    writingArray.push({
      desc: `Соединительные иглы`,
      keyValue: `${connecting_needles} шт`,
    });
    writingArray.push({
      desc: `Заглушки`,
      keyValue: `${plugs} шт`,
    });
    writingArray.push({
      desc: `Лампы`,
      keyValue: `${lamps} шт`,
    });
    writingArray.push({
      desc: `Трос / 3 мм`,
      keyValue: `${rope_3mm_length} м`,
    });
    writingArray.push({
      desc: `Стяжки / белые / 480-500 мм`,
      keyValue: `${
        white_screeds_480_500mm_packs + screeds_480_500 / 100 + screedsPacks
      } уп`,
    });
    writingArray.push({
      desc: `Стяжки / черные / 480-500 мм`,
      keyValue: `${black_screeds_480_500mm_packs} уп`,
    });
    writingArray.push({
      desc: `Клипсы для гофры`,
      keyValue: `${corr_clips} уп`,
    });
    writingArray.push({
      desc: `${getVagiModel(allItems)}`,
      keyValue: `${vagi} шт`,
    });
    writingArray.push({
      desc: "Щит уличный IP65",
      keyValue: `${street_shield_ip65} шт`,
    });
    writingArray.push({
      desc: `Автомат 10A`,
      keyValue: `${automat_10A} шт`,
    });
    writingArray.push({
      desc: `Реле напряжения`,
      keyValue: `${voltage_relay} шт`,
    });
    writingArray.push({
      desc: `Обычный проводной выключатель`,
      keyValue: `${ordinary_wired_switch} шт`,
    });
    writingArray.push({
      desc: `Беспроводной радио выключатель с радиореле`,
      keyValue: `${wireless_switch_radio} шт`,
    });
    writingArray.push({
      desc: `Беспроводной радио выключатель с Wi-Fi реле `,
      keyValue: `${wireless_switch_wifi} шт`,
    });
    writingArray.push({
      desc: `Астрономическое реле времени`,
      keyValue: `${astroRelay} шт`,
    });
    writingArray.push({
      desc: `Стяжки / 200 мм`,
      keyValue: `${screeds_200} уп`,
    });
  }
}

function getItemEstimateInfo(
  itemObj: CommonItemType,
  allItems: CommonItemType[],
  cableBrackets: number,
  rope_2mm_length: number,
  screw_ring_4x50: number,
  anchor_ring_6x50: number,
  lanyard: number,
  duplex_clamp: number,
  white_extensions_1m: number,
  white_extensions_3m: number,
  white_extensions_5m: number,
  white_extensions_10m: number,
  black_extensions_1m: number,
  black_extensions_3m: number,
  black_extensions_5m: number,
  black_extensions_10m: number,
  white_tee: number,
  black_tee: number,
  powerQuantity: number,
  metal_profile: number,
  connecting_needles: number,
  plugs: number,
  screedsPacks: number,
  lamps: number,
  rope_3mm_length: number,
  white_screeds_480_500mm_packs: number,
  black_screeds_480_500mm_packs: number,
  corr_clips: number
): {
  desc: string;
  keyValue: string;
} {
  switch (itemObj.itemTitle) {
    case "Бахрома": {
      const fringe = itemObj.item as FringeType;
      if (fringe.bracing === FringeBracingEnum.Bracket)
        cableBrackets += getFringeBracketsPacks(fringe.length);
      else if (fringe.bracing === FringeBracingEnum.Rope) {
        rope_2mm_length += getRopeLength(fringe.length, fringe.contours);
        if (fringe.surface === FringeSurfaceEnum.Wood)
          screw_ring_4x50 += getRopeRings(fringe.length, fringe.contours);
        else if (fringe.surface === FringeSurfaceEnum.Concrete)
          anchor_ring_6x50 += getRopeRings(fringe.length, fringe.contours);
        lanyard += getRopeLanyards(fringe.contours);
        duplex_clamp += getRopeDuplexClamps(fringe.contours);
      }
      if (
        fringe.extensionMult === FringeExtensionMultEnum.m_1 &&
        fringe.extensionColor === FringeExtensionColorEnum.Black
      )
        black_extensions_1m += fringe.extensionQuantity;
      else if (
        fringe.extensionMult === FringeExtensionMultEnum.m_3 &&
        fringe.extensionColor === FringeExtensionColorEnum.Black
      )
        black_extensions_3m += fringe.extensionQuantity;
      else if (
        fringe.extensionMult === FringeExtensionMultEnum.m_5 &&
        fringe.extensionColor === FringeExtensionColorEnum.Black
      )
        black_extensions_5m += fringe.extensionQuantity;
      else if (
        fringe.extensionMult === FringeExtensionMultEnum.m_10 &&
        fringe.extensionColor === FringeExtensionColorEnum.Black
      )
        black_extensions_10m += fringe.extensionQuantity;
      else if (
        fringe.extensionMult === FringeExtensionMultEnum.m_1 &&
        fringe.extensionColor === FringeExtensionColorEnum.White
      )
        white_extensions_1m += fringe.extensionQuantity;
      else if (
        fringe.extensionMult === FringeExtensionMultEnum.m_3 &&
        fringe.extensionColor === FringeExtensionColorEnum.White
      )
        white_extensions_3m += fringe.extensionQuantity;
      else if (
        fringe.extensionMult === FringeExtensionMultEnum.m_5 &&
        fringe.extensionColor === FringeExtensionColorEnum.White
      )
        white_extensions_5m += fringe.extensionQuantity;
      else if (
        fringe.extensionMult === FringeExtensionMultEnum.m_10 &&
        fringe.extensionColor === FringeExtensionColorEnum.White
      )
        white_extensions_10m += fringe.extensionQuantity;
      if (fringe.teeColour === FringeTeeColourEnum.Black)
        black_tee += fringe.teeQuantity;
      else if (fringe.teeColour === FringeTeeColourEnum.White)
        white_tee += fringe.teeQuantity;
      powerQuantity += fringe.powerQuantity;
      return {
        desc: `${fringe.title} / ${fringe.glowShade} / ${fringe.glowMode} / ${fringe.cable} / ${fringe.bracing} / ${fringe.led}`,
        keyValue: `${getFringeLength(fringe.length)} м`,
      };
    }
    case "Белт-лайт": {
      const beltLight = itemObj.item as BeltLightType;
      lamps += getBeltLightLamps(beltLight.lampStep, beltLight.length);

      return {
        desc: `${beltLight.title} / ${beltLight.glowShade} / Шаг между цоколями ламп: ${beltLight.lampStep} / ${beltLight.cable}`,
        keyValue: `${getBeltLightLength(beltLight.length)} м`,
      };
    }
    case "Гибкий неон": {
      const neon = itemObj.item as NeonType;

      metal_profile += getNeonProfile(neon.length);
      white_extensions_1m += neon.extensionQuantity;
      connecting_needles += neon.needles;
      powerQuantity += neon.powerQuantity;
      plugs += neon.contours;
      connecting_needles += neon.contours;

      return {
        desc: `${neon.title} / ${neon.glowShade} / ${neon.thickness} / ${
          neon.bracing
        } / Покраска: ${neon.painting ? "Да" : "Нет"}`,
        keyValue: `${getNeonLength(neon.length)} м`,
      };
    }
    case "Гофра для кабеля ПВС": {
      const corrPvs = itemObj.item as CorrugationType;
      corr_clips += getCorrPVSClips(allItems);

      return {
        desc: `${corrPvs.title} / ${corrPvs.thickness} / ${corrPvs.color}`,
        keyValue: `${getCorrPVSLength(allItems)} бухт`,
      };
    }
    case "Занавес": {
      const curtain = itemObj.item as CurtainType;
      powerQuantity += 1;

      if (curtain.bracing === CurtainBracingEnum.Rope) {
        rope_3mm_length += getRopeLength(4, 2);
        if (curtain.surface === CurtainSurfaceEnum.Wood)
          screw_ring_4x50 += getRopeRings(4, 2);
        else if (curtain.surface === CurtainSurfaceEnum.Concrete)
          anchor_ring_6x50 += getRopeRings(4, 2);
        lanyard += getRopeLanyards(2);
        duplex_clamp += getRopeDuplexClamps(2);
      } else if (curtain.bracing === CurtainBracingEnum.Screed) {
        if (curtain.cable === CurtainCableEnum.Black) {
          black_screeds_480_500mm_packs += getCurtainScreedsPacks(4);
        }
      } else if (curtain.cable === CurtainCableEnum.White) {
        white_screeds_480_500mm_packs += getCurtainScreedsPacks(4);
      } else if (curtain.cable === CurtainCableEnum.Transparent) {
        if (Math.random() > 0.495) {
          black_screeds_480_500mm_packs += getCurtainScreedsPacks(4);
        } else {
          white_screeds_480_500mm_packs += getCurtainScreedsPacks(4);
        }
      }

      if (curtain.cable === CurtainCableEnum.Black) {
        black_tee += curtain.teeQuantity;
      } else if (curtain.cable === CurtainCableEnum.White) {
        white_tee += curtain.teeQuantity;
      } else if (curtain.cable === CurtainCableEnum.Transparent) {
        if (Math.random() > 0.495) {
          black_tee += curtain.teeQuantity;
        } else {
          white_tee += curtain.teeQuantity;
        }
      }

      if (
        curtain.extensionMult === CurtainExtensionMultEnum.m_1 &&
        curtain.cable === CurtainCableEnum.White
      ) {
        white_extensions_1m += curtain.extensionQuantity;
      } else if (
        curtain.extensionMult === CurtainExtensionMultEnum.m_3 &&
        curtain.cable === CurtainCableEnum.White
      ) {
        white_extensions_3m += curtain.extensionQuantity;
      } else if (
        curtain.extensionMult === CurtainExtensionMultEnum.m_1 &&
        curtain.cable === CurtainCableEnum.Black
      ) {
        black_extensions_1m += curtain.extensionQuantity;
      } else if (
        curtain.extensionMult === CurtainExtensionMultEnum.m_3 &&
        curtain.cable === CurtainCableEnum.Black
      ) {
        black_extensions_3m += curtain.extensionQuantity;
      } else if (
        curtain.extensionMult === CurtainExtensionMultEnum.m_1 &&
        curtain.cable === CurtainCableEnum.Transparent
      ) {
        if (Math.random() > 0.495) {
          black_extensions_1m += curtain.extensionQuantity;
        } else {
          white_extensions_1m += curtain.extensionQuantity;
        }
      } else if (
        curtain.extensionMult === CurtainExtensionMultEnum.m_3 &&
        curtain.cable === CurtainCableEnum.Transparent
      ) {
        if (Math.random() > 0.495) {
          black_extensions_3m += curtain.extensionQuantity;
        } else {
          white_extensions_3m += curtain.extensionQuantity;
        }
      }

      return {
        desc: `${curtain.title} / ${curtain.size} / ${curtain.glowMode} / ${curtain.glowShade} / ${curtain.cable} / Кратность удлинителя: ${curtain.extensionMult} / Удлинители ${curtain.extensionQuantity} шт/ Тройники ${curtain.teeQuantity} шт`,
        keyValue: `${curtain.size}`,
      };
    }
    case "Кабель ПВС": {
      const pvs = itemObj.item as PVSType;
      return {
        desc: `${pvs.title} / ${pvs.color}`,
        keyValue: `${getPVSLength(pvs.length, pvs.color)} бухт`,
      };
    }
    case "Кабель-канал (короб) для кабеля ПВС": {
      const boxPVS = itemObj.item as BoxPVSType;
      return {
        desc: `${boxPVS.title} / 25x16мм / ${boxPVS.color}`,
        keyValue: `${getBoxPVSPieces(allItems)} шт`,
      };
    }
    case "Нить": {
      const thread = itemObj.item as ThreadType;
      if (thread.bracing === ThreadBracingEnum.Screeds)
        screedsPacks += getThreadScreedsPacks(thread.length);
      else if (thread.bracing === ThreadBracingEnum.Rope) {
        rope_2mm_length += getRopeLength(thread.length, thread.contours);
        if (thread.surface === ThreadSurfaceEnum.Wood) {
          screw_ring_4x50 += getRopeRings(thread.length, thread.contours);
        } else if (thread.surface === ThreadSurfaceEnum.Concrete) {
          anchor_ring_6x50 += getRopeRings(thread.length, thread.contours);
        }
        duplex_clamp += getRopeDuplexClamps(thread.contours);
        lanyard += getRopeLanyards(thread.contours);
      }
      powerQuantity += thread.powerQuantity;
      if (
        thread.extensionMult === ThreadExtensionMultEnum.m_1 &&
        thread.wire === ThreadWireEnum.Black
      ) {
        black_extensions_1m += thread.extensionQuantity;
      } else if (
        thread.extensionMult === ThreadExtensionMultEnum.m_3 &&
        thread.wire === ThreadWireEnum.Black
      ) {
        black_extensions_3m += thread.extensionQuantity;
      } else if (
        thread.extensionMult === ThreadExtensionMultEnum.m_1 &&
        thread.wire === ThreadWireEnum.White
      ) {
        white_extensions_1m += thread.extensionQuantity;
      } else if (
        thread.extensionMult === ThreadExtensionMultEnum.m_3 &&
        thread.wire === ThreadWireEnum.White
      ) {
        white_extensions_3m += thread.extensionQuantity;
      }

      if (thread.wire === ThreadWireEnum.Black) {
        black_tee += thread.teeQuantity;
      } else if (thread.wire === ThreadWireEnum.White) {
        white_tee += thread.teeQuantity;
      }

      return {
        desc: `${thread.title} / ${thread.glowShade} / ${thread.glowMode} / ${thread.wire}`,
        keyValue: `${getThreadLength(thread.length)} м`,
      };
    }
    case "Трос": {
      const rope = itemObj.item as RopeType;
      if (rope.thickness === RopeThicknessEnum.mm_2) {
        rope_2mm_length = getRopeLength(rope.length, rope.contours);
      } else if (rope.thickness === RopeThicknessEnum.mm_3) {
        rope_3mm_length = getRopeLength(rope.length, rope.contours);
      }
      if (rope.surface === RopeSurfaceEnum.Wood)
        screw_ring_4x50 += getRopeRings(rope.length, rope.contours);
      else if (rope.surface === RopeSurfaceEnum.Concrete)
        anchor_ring_6x50 += getRopeRings(rope.length, rope.contours);
      lanyard += getRopeLanyards(rope.contours);
      duplex_clamp += getRopeDuplexClamps(rope.contours);

      return {
        desc: "",
        keyValue: "0",
      };
    }
    case "Распаячная коробка": {
      const solderBox = itemObj.item as SolderBoxType;
      return {
        desc: `${solderBox.title} / 100x100x50 / ${solderBox.color}`,
        keyValue: `${getSolderBoxPieces(allItems)} шт`,
      };
    }
    default: {
      return {
        desc: "",
        keyValue: "0",
      };
    }
  }
}

function getItems(idb: IndexedDB, orderId: IDBValidKey) {
  return new Promise<CommonItemType[]>((resolve, reject) => {
    idb.measures
      .getOwn(orderId)
      .then((measures) => {
        let favouriteMeasure = measures.find((measure) => measure.isFavourite);
        if (!favouriteMeasure) resolve([]);
        idb.objects.getOwn(favouriteMeasure!.id).then((objects) => {
          if (!objects.length) resolve([]);
          const allItems: CommonItemType[] = [];
          objects.forEach(async (object, index) => {
            const items = await idb.items.getOwn(object.id);
            allItems.push(...items);
            if (index === objects.length - 1) resolve(allItems);
          });
        });
      })
      .catch((err) => reject(err));
  });
}
