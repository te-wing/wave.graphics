'use client';

import styles from './beta.module.scss';

export default function Beta() {
  return (
    <>
      <p className={styles.betatext}>現在β版です．利用可能ですが，予期せぬエラーが発生する可能性があります．また，一部のコンテンツは準備中である場合もあります．</p>
    </>
  )
}