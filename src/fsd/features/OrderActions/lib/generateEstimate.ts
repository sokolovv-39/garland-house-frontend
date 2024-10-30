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
  RopeType,
  ThreadType,
  getNeonLength,
  getNeonProfile,
  getThreadLength,
  getBeltLightLength,
  getEsPVS,
  FringeSurfaceEnum,
  ThreadBracingEnum,
  getRopeLength,
  getRopeRings,
  getRopeLanyards,
  getRopeDuplexClamps,
  ThreadSurfaceEnum,
  CurtainBracingEnum,
  CurtainSurfaceEnum,
  RopeThicknessEnum,
  RopeSurfaceEnum,
  getCorrPVSClips,
  SolderBoxType,
  getSolderBoxPieces,
  getAllVagi,
  getVagiModel,
  FringeBracingEnum,
  Screed_480_500_Type,
  Screed_200_Type,
  get_Screeds_480_500_packs,
  getEsNeon,
  getEsCurtains,
  getEsThread,
  getEsCorrPVS,
  getEsBoxPvs,
  getEsRope,
  getEsCableBrackets,
  getEsScrewRings,
  getEsAnchorRings,
  getEsLanyards,
  getEsDuplexClamps,
  getEsExtensions,
  getEsTees,
  getEsPowerUnits,
  getEsMetalProfile,
  getEsConnectingNeedles,
  getEsPlugs,
  getEsLamps,
  getEsCorrClips,
  get_screeds_200_packs,
  getCustomScreeds_480_500,
  getEsElectricShield,
  ObjectType,
} from "@/fsd/entities";
import fontkit from "@pdf-lib/fontkit";
import { NeonType } from "@/fsd/entities/Neon/model";
import { getEsBeltLight } from "@/fsd/entities/BeltLight/lib/estimateAlgs";
import { FringeCableEnum, getEsFringe } from "@/fsd/entities/Fringe";
import { getRelaysSwitches } from "@/fsd/entities/RelaysSwitches/lib/estimateAlgs";
import robotoFontUrl from "./fonts/Roboto-Regular.ttf";
import { EsWritingArrayType } from "../model";
import { screed_200_custom_es } from "@/fsd/entities/Screed_200/lib/estimateAlgs";

export async function generateEstimate(idb: IndexedDB, orderId: IDBValidKey) {
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

  const objItemsArr = await getItemsObj(idb, orderId);

  objItemsArr.forEach((el) => {
    // Позиции в смете
    const fringes = getEsFringe(el.items);
    const beltLights = getEsBeltLight(el.items);
    const neons = getEsNeon(el.items);
    const curtains = getEsCurtains(el.items);
    const threads = getEsThread(el.items);
    const pvses = getEsPVS(el.items);
    const corrPvs = getEsCorrPVS(el.items);
    const boxPvs = getEsBoxPvs(el.items);
    const ropes = getEsRope(el.items);
    const cableBracketPacks = getEsCableBrackets(el.items);
    let screw_ring_4x50 = getEsScrewRings(el.items);
    let anchor_ring_6x50 = getEsAnchorRings(el.items);
    let lanyards = getEsLanyards(el.items);
    let duplex_clamps = getEsDuplexClamps(el.items);
    let extensions = getEsExtensions(el.items);
    let { black_tees, white_tees } = getEsTees(el.items);
    let metal_profile = getEsMetalProfile(el.items);
    let connecting_needles = getEsConnectingNeedles(el.items);
    let plugs = getEsPlugs(el.items);
    const powerUnits = getEsPowerUnits(el.items);
    let lamps = getEsLamps(el.items);
    let screeds_480_500_mm = getCustomScreeds_480_500(el.items);
    let screeds_200_mm = screed_200_custom_es(el.items);
    let corr_clips = getEsCorrClips(el.items);
    let { street_shield_ip65, automat_10A, voltage_relay } =
      getEsElectricShield(el.items);
    let {
      default_1,
      default_2,
      wireless_1,
      wireless_2,
      wireless_3,
      wireless_1_wifi,
      wireless_2_wifi,
      wireless_3_wifi,
      photoRelay,
      astroRelay,
      relays,
    } = getRelaysSwitches(el.items);
    const vagi = getAllVagi(el.items);
    const solderBoxes = getSolderBoxPieces(el.items);

    const writingArray = getPositionsEstimateInfo();

    writingArray.forEach((item, index) =>
      writeItem(item.desc, item.keyValue, index !== 0)
    );

    currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
    yPosition = pageHeight - margin;

    function getPositionsEstimateInfo(): EsWritingArrayType[] {
      const writingArray: EsWritingArrayType[] = [];

      writingArray.push({
        desc: el.title,
        keyValue: "",
      });

      fringes.forEach((fringe) => {
        writingArray.push(fringe);
      });

      cableBracketPacks.forEach((el) => {
        writingArray.push(el);
      });

      beltLights.forEach((beltLight) => {
        writingArray.push(beltLight);
      });

      lamps.forEach((el) => {
        writingArray.push(el);
      });

      neons.forEach((neon) => {
        writingArray.push(neon);
      });
      metal_profile.forEach((el) => {
        writingArray.push(el);
      });

      connecting_needles.forEach((el) => {
        writingArray.push(el);
      });

      plugs.forEach((el) => {
        writingArray.push(el);
      });

      curtains.forEach((curtain) => {
        writingArray.push(curtain);
      });

      threads.forEach((thread) => {
        writingArray.push(thread);
      });
      pvses.forEach((pvs) => {
        writingArray.push(pvs);
      });

      corrPvs.forEach((el) => {
        writingArray.push(el);
      });

      writingArray.push({
        desc: `Клипсы для гофры`,
        keyValue: `${corr_clips} уп`,
      });

      writingArray.push(boxPvs);

      ropes.forEach((rope) => {
        writingArray.push(rope);
      });

      writingArray.push({
        desc: "Шуруп-кольцо / 4x50",
        keyValue: `${screw_ring_4x50} шт`,
      });

      writingArray.push({
        desc: `Анкер-кольцо / 6x50`,
        keyValue: `${anchor_ring_6x50} шт`,
      });

      writingArray.push({
        desc: `Талреп`,
        keyValue: `${lanyards} шт`,
      });

      writingArray.push({
        desc: `Дуплексный зажим`,
        keyValue: `${duplex_clamps} шт`,
      });

      powerUnits.forEach((el) => {
        writingArray.push(el);
      });

      extensions.forEach((el) => {
        writingArray.push(el);
      });

      writingArray.push({
        desc: `Тройник / черный`,
        keyValue: `${black_tees} шт`,
      });
      writingArray.push({
        desc: `Тройник / белый`,
        keyValue: `${white_tees} шт`,
      });
      screeds_200_mm.forEach((screed) => {
        writingArray.push(screed);
      });

      screeds_480_500_mm.forEach((screed) => {
        writingArray.push(screed);
      });
      writingArray.push({
        desc: `${getVagiModel(el.items)}`,
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
        desc: `Обычный выключатель 1-клавишный`,
        keyValue: `${default_1} шт`,
      });
      writingArray.push({
        desc: `Обычный выключатель 2-клавишный`,
        keyValue: `${default_2} шт`,
      });
      writingArray.push({
        desc: `Беспроводной 1-клавишный выключатель`,
        keyValue: `${wireless_1} шт`,
      });
      writingArray.push({
        desc: `Беспроводной 2-клавишный выключатель`,
        keyValue: `${wireless_2} шт`,
      });
      writingArray.push({
        desc: `Беспроводной 3-клавишный выключатель`,
        keyValue: `${wireless_3} шт`,
      });
      writingArray.push({
        desc: `Беспроводной 1-клавишный выключатель + WIFI`,
        keyValue: `${wireless_1_wifi} шт`,
      });
      writingArray.push({
        desc: `Беспроводной 2-клавишный выключатель + WIFI`,
        keyValue: `${wireless_2_wifi} шт`,
      });
      writingArray.push({
        desc: `Беспроводной 3-клавишный выключатель + WIFI`,
        keyValue: `${wireless_3_wifi} шт`,
      });
      writingArray.push({
        desc: `Фотореле`,
        keyValue: `${photoRelay} шт`,
      });
      writingArray.push({
        desc: `Астрономическое реле`,
        keyValue: `${astroRelay} шт`,
      });
      writingArray.push({
        desc: `Радиореле`,
        keyValue: `${relays} шт`,
      });
      writingArray.push(solderBoxes);
      return writingArray;
    }
  });

  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

  const aEl = document.createElement("a");
  aEl.href = pdfDataUri;
  aEl.download = "Смета";
  aEl.click();

  function writeItem(
    desc: string,
    keyValue: string,
    isDivider: boolean = true
  ) {
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

    if (isDivider) {
      // Рисуем разделитель после текста
      yPosition -= lineHeight / 2;
      drawDivider(currentPage, yPosition);
      yPosition -= lineHeight; // Зазор после разделителя
    } else {
      yPosition -= 1.5 * lineHeight;
    }
    // Функция для рисования разделителя
    function drawDivider(page: any, y: number) {
      page.drawLine({
        start: { x: margin, y },
        end: { x: pageWidth - margin, y },
        thickness: dividerHeight,
        color: rgb(0.5, 0.5, 0.5), // серая линия
      });
    }
  }
}

async function getItemsObj(idb: IndexedDB, orderId: IDBValidKey) {
  const itemsArr: Array<{
    title: string;
    items: CommonItemType[];
  }> = [];
  const measures = await idb.measures.getOwn(orderId);
  let fav = measures.find((meas) => meas.isFavourite);
  const objects = await idb.objects.getOwn(fav!.id);
  await Promise.all(
    objects.map(async (obj) => {
      const items = await idb.items.getOwn(obj.id);
      itemsArr.push({
        title: obj.title,
        items,
      });
    })
  );
  return itemsArr;
}
