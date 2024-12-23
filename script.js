<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>실시간 금 시세 차트</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h2>실시간 금 1돈 시세 차트</h2>
  <canvas id="goldChart" width="800" height="400"></canvas>

  <script>
    async function fetchGoldPrice() {
      try {
        const response = await fetch('https://api.example.com/gold-price'); // 실제 API URL로 대체
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        return null;
      }
    }

    function updateChart(chart, labels, prices) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = prices;
      chart.update();
    }

    async function initializeChart() {
      const ctx = document.getElementById('goldChart').getContext('2d');
      const goldChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [], // 날짜 데이터
          datasets: [{
            label: '금 시세 (1돈, KRW)',
            data: [], // 시세 데이터
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: { title: { display: true, text: '날짜' } },
            y: { title: { display: true, text: '시세 (KRW)' } },
          },
          plugins: {
            legend: { display: true }
          }
        }
      });

      const data = await fetchGoldPrice();
      if (data) {
        const labels = data.map(entry => entry.date);
        const prices = data.map(entry => entry.price);
        updateChart(goldChart, labels, prices);
      }
    }

    initializeChart();
  </script>
</body>
</html>
