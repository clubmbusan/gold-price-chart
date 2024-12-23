fetch('https://api.example.com/gold-prices') // 실제 금 시세 API URL로 대체
  .then(response => response.json())
  .then(data => {
    const labels = data.dates; // X축: 날짜 배열
    const prices = data.prices; // Y축: 시세 배열

    const ctx = document.getElementById('goldChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '금 시세 (1돈, KRW)',
          data: prices,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false,
        }]
      },
      options: {
        scales: {
          x: { title: { display: true, text: '날짜' } },
          y: { title: { display: true, text: '시세 (KRW)' } },
        }
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));
