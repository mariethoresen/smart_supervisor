var MyChart = function (ctx) {
    var self = this;
    this.downloadChance = 0.25;
    this.uploadChance = 0.25;
    this.count = 1;
    this.chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: [getTimeOfDay()],
            datasets: [{
                label: 'Download',
                backgroundColor: 'rgba(138, 203, 136, 0.6)',
                borderColor: 'rgb(255, 255, 255)',
                data: [0],
            }, {
                label: 'Upload',
                backgroundColor: 'rgba(87, 117, 144, 0.6)',
                borderColor: 'rgb(255, 255, 255)',
                data: [0],
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        borderDash: [5],
                        beginAtZero: true,
                        max: 500,
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return value + 'kbps';
                        }
                    }
                }],
            }
        }
    });
    this.init = function () {
        while (self.count < 10) {
            self.chart.data.labels.push(getTimeOfDay());
            let down = (Math.random() < self.usageChance) ?
                map(simplexDown.noise2D(self.count, 1), -1, 1, 0, 200) :
                0;
            let up = (Math.random() < self.usageChance) ?
                map(simplexUp.noise2D(self.count, 1), -1, 1, 0, 200) :
                0;
            self.chart.data.datasets[0].data.push(down);
            self.chart.data.datasets[1].data.push(up);
            self.count++;
        }
    }

    this.updateChart = function () {
        let downloadData = self.chart.data.datasets[0].data;
        let uploadData = self.chart.data.datasets[1].data;
        let labels = self.chart.data.labels;

        labels.shift();
        downloadData.shift()
        uploadData.shift();

        labels.push(getTimeOfDay());
        let down = (Math.random() < self.downloadChance) ?
            map(simplexDown.noise2D(self.count, 1), -1, 1, 0, 200) :
            0;
        let up = (Math.random() < self.uploadChance) ?
            map(simplexUp.noise2D(self.count, 1), -1, 1, 0, 200) :
            0;
        if (down > 0) self.downloadChance += 0.1;
        else self.downloadChance = 0.25;
        if (up > 0) self.uploadChance += 0.1;
        else self.uploadChance = 0.25;

        if (self.downloadChance > 1) self.downloadChance = 0.25;
        if (self.uploadChance > 1) self.uploadChance = 0.25;
        downloadData.push(down);
        uploadData.push(up);


        self.count++;
        self.chart.update();
    }

    this.update = setInterval(this.updateChart, 1000);;
}