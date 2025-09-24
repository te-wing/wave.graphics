'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import styles from './formstyles.module.scss';

export default function FormBox() {
  useEffect(() => {
    const form = document.getElementById('survey-form') as HTMLFormElement; // ここを修正
    const submitButton = document.getElementById('submitButtonOnForm') as HTMLButtonElement; // ここを修正
    const rateSelect = document.getElementById('rate') as unknown as HTMLSelectElement;

    if (!form || !submitButton || !rateSelect) {
      console.error('フォーム要素が見つからないか，正しい形式ではありません．');
      return;
    }

    const validateRate = () => {
      // rateSelectがHTMLSelectElementであることを明示しているので、.valueにアクセスできます
      return rateSelect.value !== '';
    };

    const updateButtonState = () => {
      if (validateRate()) {
        // submitButtonがHTMLButtonElementであることを明示しているので、.disabledにアクセスできます
        submitButton.disabled = false;
        submitButton.classList.remove(styles.disabledBtn);
      } else {
        submitButton.disabled = true;
        submitButton.classList.add(styles.disabledBtn);
      }
    };

    // サイト評価の変更を監視
    rateSelect.addEventListener('change', updateButtonState);

    // 初期状態のチェック
    updateButtonState();

    // 以下の handleSubmit 関数とイベントリスナーの設定は変更なし
    const workerUrl = 'https://form-workers.wing.osaka';
    type WorkersResponse = {
      message?: string;
      key?: string;
      error?: string;
    };
    const handleSubmit = async (event: Event) => {
      event.preventDefault();

      const formData = new FormData(form as HTMLFormElement);
      formData.append('host', 'wave.graphics');

      // Turnstileのトークンが存在するかをチェック
      const token = formData.get('cf-turnstile-response');
      if (!token) {
        alert('Turnstileできてへんで〜．');
        return;
      }
      try {
        const response = await fetch(workerUrl, {
          method: 'POST',
          body: formData,
        });
        const result: WorkersResponse = await response.json();

        if (response.ok) {
          alert('おおきに，たぶんアンケートの送信ができました．');
          form.reset();
        } else {
          alert('エラー：' + result.error);
        }

      } catch (error) {
        console.error('通信エラー：', error);
        alert('通信中にエラーが発生しましたと思います．');
      }
    };

    form.addEventListener('submit', handleSubmit);

    return () => {
      rateSelect.removeEventListener('change', updateButtonState);
      form.removeEventListener('submit', handleSubmit);
    };

  }, []);

  return (
    <div className={styles.formBox}>
      {/* Turnstileスクリプトの読み込み */}
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />

      <h4 className={styles.h4}>アンケート</h4>
      <form className={styles.form} id="survey-form">
        <label className={styles.formLabel} htmlFor="username">お名前（任意）：</label>
        <input placeholder="ニックネームも可" className={styles.shortTextBox} type="text" id="username" name="username" /><br /><br />
        <label className={styles.formLabel} htmlFor="email">メールアドレス（任意）：</label>
        <input placeholder="example@you.wing.osaka" className={styles.shortTextBox} type="email" id="email" name="email" /><br /><br />
        <label className={styles.formLabel} htmlFor="rate">サイト評価（必須）：</label>
        <select id="rate" name="rate" required>
          <option value="">選択してください</option>
          <option value="5">5 - とても良い</option>
          <option value="4">4 - 良い</option>
          <option value="3">3 - 普通</option>
          <option value="2">2 - 悪い</option>
          <option value="1">1 - とても悪い</option>
        </select>
        <br /><br />
        <label className={styles.formLabel} htmlFor="comment">ご意見・お問合せ（任意）：</label>
        <textarea placeholder="コメント・お問合せなどを入力してください．" className={styles.commentBox} id="comment" name="comment"></textarea><br/><br/>

        {/* Turnstileウィジェットの追加 */}
        <div
          className="cf-turnstile"
          data-sitekey='0x4AAAAAABpyNGg6V96WphRE'
        ></div>
        <br /><br />

        <button id="submitButtonOnForm" className={styles.submitBtn} type="submit">送信</button>
      </form>
    </div>
  );
}
