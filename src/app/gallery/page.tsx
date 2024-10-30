"use client";

import { Header } from "@/fsd/widgets/Header/ui/Header";
import classes from "./page.module.scss";
import { Button, Photo, Textarea } from "@/fsd/shared";
import Modal from "react-modal";
import { useState } from "react";
import PhotoPNG from "./photo.png";
import Image from "next/image";
import PhotoEdit from "./photo_edit.png";
import { uploadMedia } from "@/fsd/entities/Media/lib";
import { AddMedia } from "@/fsd/entities";

export default function GalleryPage() {
  const [isPhoto, setIsPhoto] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  function closePhoto() {
    setIsPhoto(false);
  }

  function openPhoto() {
    setIsPhoto(true);
  }

  function openEdit(e: React.MouseEvent<SVGElement>) {
    e.stopPropagation();
    setIsEdit(true);
  }

  function closeEdit() {
    setIsEdit(false);
  }

  function closeAdd() {
    setIsAdd(false);
  }

  function openAdd() {
    setIsAdd(true);
  }

  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.titleAdd}>
        <h1>Галерея работ</h1>
        <Button click={openAdd}>Добавить фото</Button>
      </div>
      <div className={classes.gallery}>
        {Array.from({ length: 7 }).map((el, i) => {
          return <Photo key={i} openPhoto={openPhoto} openEdit={openEdit} />;
        })}
      </div>
      <Modal
        isOpen={isPhoto}
        onRequestClose={closePhoto}
        style={{
          overlay: {
            background: "rgba(25, 25, 25, 0.36)",
          },
          content: {
            padding: "0",
            width: "min-content",
            left: "50%",
            transform: "translateX(-50%)",
          },
        }}
      >
        <svg
          onClick={closePhoto}
          style={{
            position: "absolute",
            right: "24px",
            top: "18px",
            cursor: "pointer",
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
        >
          <rect width="48" height="48" fill="#191919" fill-opacity="0.5" />
          <path
            d="M15.5625 33.4333L34.4292 14.5667"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M34.4292 33.4333L15.5625 14.5667"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <Image src={PhotoPNG} alt="" />
      </Modal>
      <Modal
        isOpen={isEdit}
        onRequestClose={closeEdit}
        style={{
          overlay: {
            background: "rgba(25, 25, 25, 0.36)",
          },
          content: {
            width: "min-content",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            height: "min-content",
            border: "none",
            borderRadius: "16px",
          },
        }}
      >
        <EditModal closeEdit={closeEdit} />
      </Modal>
      <Modal
        isOpen={isAdd}
        onRequestClose={closeAdd}
        style={{
          overlay: {
            background: "rgba(25, 25, 25, 0.36)",
          },
          content: {
            width: "min-content",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            height: "min-content",
            border: "none",
            borderRadius: "16px",
          },
        }}
      >
        <AddModal closeModal={closeAdd} />
      </Modal>
    </div>
  );
}

function EditModal({ closeEdit }: { closeEdit: () => void }) {
  return (
    <div className={classes.modalWrapper}>
      <h2>Редактирование</h2>
      <div className={classes.content}>
        <div className={classes.photo}>
          <Image src={PhotoEdit} alt="" />
          <Button mode="beige" click={uploadMedia}>
            Заменить фото
          </Button>
        </div>
        <Textarea width={386} height={184} littleType="Комментарий к замеру" />
      </div>
      <div className={classes.btns}>
        <Button
          mode="red"
          style={{
            width: "180px",
          }}
        >
          Удалить
        </Button>
        <div className={classes.right}>
          <Button
            mode="blackWhite"
            style={{
              width: "160px",
            }}
            click={closeEdit}
          >
            Закрыть
          </Button>
          <Button
            style={{
              width: "160px",
            }}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}

function AddModal({ closeModal }: { closeModal: () => void }) {
  return (
    <div className={classes.modalWrapper}>
      <h2> Добавление фото</h2>
      <div className={classes.content}>
        <AddMedia width={208} height={136} callback={() => {}} />
        <Textarea width={375} height={136} littleType="Добавьте описание" />
      </div>
      <div
        className={classes.btns}
        style={{
          justifyContent: "flex-end",
        }}
      >
        <div className={classes.right}>
          <Button
            mode="blackWhite"
            style={{
              width: "160px",
            }}
            click={closeModal}
          >
            Закрыть
          </Button>
          <Button
            style={{
              width: "160px",
            }}
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
