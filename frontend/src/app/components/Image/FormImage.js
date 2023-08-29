'use client'
import { useState, useRef, useCallback, memo } from "react"
import Avatar from "react-avatar"
import { IconEditor } from "./IconEditor"
import styles from '../../../styles/FormImage.module.scss';
import Image from 'next/image';

const FormImage = memo(({ icon, handleChangeIcon }) => {
  const [previewIcon, setPreviewIcon] = useState('')
  const iconInputRef = useRef(null)

  const handleClickChangeIcon = useCallback(() => {
    if (!iconInputRef || !iconInputRef.current) return;
    iconInputRef.current.click();
  }, [])

  const handleChangePreviewIcon = useCallback((e) => {
      if (!e.target.files?.length) return;
      setPreviewIcon(e.target.files[0]);
      e.currentTarget.value = '';
  },[]);

  return (
    <>
      <div className={styles.avatar}>
        <Avatar
          size='160'
          round
          color='#ddd'
          alt='アイコン'
          src={/^http?:/.test(icon) ? icon : (icon ? URL.createObjectURL(icon) : null)}
        />
        <button
          className={styles.avatarEdit}
          type="button"
          onClick={handleClickChangeIcon}
        >
          <Image
            src="/imageEdit.svg"
            width={40}
            height={30}
            alt="アイコン編集"
          />
        </button>
        <input
          name="icon"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={iconInputRef}
          onChange={handleChangePreviewIcon}
        />
        <IconEditor
          previewIcon={previewIcon}
          onChangePreviewIcon={setPreviewIcon}
          onChangeIcon={handleChangeIcon}
        />
      </div>
    </>
  )
})

export default FormImage