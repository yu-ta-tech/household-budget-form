document.addEventListener("DOMContentLoaded", function () {
  // 日付選択肢の生成
  generateDateOptions();

  // フォームの送信前にバリデーションを実行
  document
    .getElementById("household-form")
    .addEventListener("submit", function (event) {
      if (!validateForm()) {
        event.preventDefault();
      }
    });

  // リセットボタンのクリック時に日付をデフォルトに戻す
  document
    .getElementById("household-form")
    .addEventListener("reset", function () {
      setTimeout(function () {
        setDefaultDate();
      }, 10);
    });

  // 収入/支出の選択に応じて項目を変更
  document.getElementById("type").addEventListener("change", function () {
    updateCategoryOptions();
  });
});

// 日付選択肢の生成
function generateDateOptions() {
  const dateSelect = document.getElementById("date");

  // 過去31日と当日の日付選択肢を生成
  const today = new Date();

  for (let i = 0; i <= 31; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];

    const dateString = `${year}/${month}/${day}`;
    const displayText = `${month}/${day}（${dayOfWeek}）`;

    const option = document.createElement("option");
    option.value = dateString;
    option.text = displayText;

    dateSelect.appendChild(option);
  }

  // デフォルトで当日を選択
  setDefaultDate();
}

// デフォルトで当日の日付を設定
function setDefaultDate() {
  const dateSelect = document.getElementById("date");
  dateSelect.selectedIndex = 0;
}

// 収入/支出の選択に応じて項目選択肢を更新
function updateCategoryOptions() {
  const typeSelect = document.getElementById("type");
  const categorySelect = document.getElementById("category");

  // 現在の選択値を保存
  const currentValue = categorySelect.value;

  // 選択肢をクリア
  categorySelect.innerHTML = '<option value="">選択してください</option>';

  // 収入または支出に応じた選択肢を追加
  if (typeSelect.value === "収入") {
    const incomeCategories = ["給与", "副業", "臨時収入", "その他・収入"];

    incomeCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.text = category;
      categorySelect.appendChild(option);
    });
  } else if (typeSelect.value === "支出") {
    const expenseCategories = [
      "食費",
      "雑費",
      "日用品",
      "交通費",
      "趣味・娯楽",
      "教養・教育",
      "衣服・美容",
      "自動車",
      "健康・医療",
      "水道・光熱費",
      "通信費",
      "保険",
      "住宅",
      "その他・貯金",
      "予算外",
    ];

    expenseCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.text = category;
      categorySelect.appendChild(option);
    });
  } else if (typeSelect.value === "チャージ" || typeSelect.value === "入金") {
    const walletCategories = ["財布"];

    walletCategories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category;
      option.text = category;
      categorySelect.appendChild(option);
    });
  }

  // 以前の選択を復元（存在する場合）
  if (currentValue) {
    for (let i = 0; i < categorySelect.options.length; i++) {
      if (categorySelect.options[i].value === currentValue) {
        categorySelect.selectedIndex = i;
        break;
      }
    }
  }
}

// フォームのバリデーション
function validateForm() {
  const required = ["date", "type", "category", "amount", "payment-method"];

  let isValid = true;

  required.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field.value.trim()) {
      field.style.borderColor = "#e74c3c";
      isValid = false;
    } else {
      field.style.borderColor = "#ddd";
    }
  });

  // 金額が数値であることを確認
  const amountField = document.getElementById("amount");
  if (isNaN(amountField.value) || amountField.value <= 0) {
    amountField.style.borderColor = "#e74c3c";
    isValid = false;
  }

  return isValid;
}
