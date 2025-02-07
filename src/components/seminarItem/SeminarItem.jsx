import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './SeminarItem.module.css';
import { useEditSeminarMutation, useDeleteSeminarMutation } from '../../store/api/seminarApi';

Modal.setAppElement('#root');

const SeminarItem = (props) => {
  const { title, date, id, description, time, photo } = props.data;
  
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [editSeminar, { isLoading }] = useEditSeminarMutation();
  const [deleteSeminar] = useDeleteSeminarMutation();

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDate, setUpdatedDate] = useState(date);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedTime, setUpdatedTime] = useState(time);

  const handleEditClick = () => setIsEditing(true);
  const handleDeleteClick = () => setIsConfirmingDelete(true);

  const confirmDelete = () => {
    deleteSeminar(id)
      .unwrap()
      .then(() => setIsConfirmingDelete(false))
      .catch((error) => console.error('Ошибка удаления:', error));
  };

  const handleSaveClick = () => {
    const updatedSeminar = { id, title: updatedTitle, date: updatedDate, description: updatedDescription, time: updatedTime, photo };
    
    editSeminar(updatedSeminar).unwrap()
      .then(() => setIsEditing(false))
      .catch((error) => console.error('Ошибка редактирования:', error));
  };

  return (
    <div className={styles['seminar']}>
      <img src={photo} alt={title} className={styles['seminar__image']} />
      <div className={styles['seminar__content']}>
        <h2 className={styles['seminar__title']}>{title}</h2>
        <p className={styles['seminar__date']}>Дата: {date}</p>
        <p className={styles['seminar__time']}>Время: {time}</p>
        <p className={styles['seminar__description']}>{description}</p>

        <div className={styles['seminar__buttons']}>
          <button className={styles['seminar__button']} onClick={handleEditClick}>Редактировать</button>
          <button className={styles['seminar__button']} onClick={handleDeleteClick}>Удалить</button>
        </div>
      </div>

      {/* Модальное окно редактирования */}
      <Modal isOpen={isEditing} onRequestClose={() => setIsEditing(false)} className={styles['modal']} overlayClassName={styles['modal-overlay']}>
        <div className={styles['modal__content']}>
          <h2>Редактирование семинара</h2>
          <div className={styles['modal__form']}>
            <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} className={styles['modal__input']} placeholder="Название" />
            <input type="text" value={updatedDate} onChange={(e) => setUpdatedDate(e.target.value)} className={styles['modal__input']} placeholder="Дата" />
            <input type="text" value={updatedTime} onChange={(e) => setUpdatedTime(e.target.value)} className={styles['modal__input']} placeholder="Время" />
            <textarea value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} className={styles['modal__textarea']} placeholder="Описание" />
          </div>
          <div className={styles['modal__buttons']}>
            <button className={styles['modal__button']} onClick={handleSaveClick} disabled={isLoading}>{isLoading ? 'Сохраняем...' : 'Сохранить'}</button>
            <button className={styles['modal__button']} onClick={() => setIsEditing(false)}>Отмена</button>
          </div>
        </div>
      </Modal>

      {/* Модальное окно удаления */}
      <Modal isOpen={isConfirmingDelete} onRequestClose={() => setIsConfirmingDelete(false)} className={styles['modal']} overlayClassName={styles['modal-overlay']}>
        <div className={styles['modal__content']}>
          <h2>Подтверждение удаления</h2>
          <p>Вы уверены, что хотите удалить этот семинар?</p>
          <div className={styles['modal__buttons']}>
            <button className={styles['modal__button']} onClick={confirmDelete}>Да, удалить</button>
            <button className={styles['modal__button']} onClick={() => setIsConfirmingDelete(false)}>Отмена</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SeminarItem;
