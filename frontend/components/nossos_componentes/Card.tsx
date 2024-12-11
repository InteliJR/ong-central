"use client";

import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  text: string;
  isHighlighted?: boolean; // Prop para indicar se o card deve ter o fundo colorido
}

const Card: React.FC<CardProps> = ({ title, text, isHighlighted = false }) => {
  return (
    <div className={`hover:shadow-lg transition-shadow ${styles.card} ${isHighlighted ? styles.highlighted : ''}`}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Card;
