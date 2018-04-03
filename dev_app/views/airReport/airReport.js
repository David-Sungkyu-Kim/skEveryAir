directory.airReport = Backbone.View.extend({
    activeTabIndex: 0,
    initialize: function () {

        this.render();
    },
    render: function () {
        var self = this;
        App.util.setReloader();
        // 헤더 바인딩
        App.view.subHeader.render();

        $('._tomorrow').hide();
        var now= moment().format('YYYY-MM-DD');
        this.dailyReportBind("000",now);

        // 컨텐츠 바인딩
        $('.wrap_contents').removeClass('report_chart wrap_contents_gray').addClass('report_chart').html(self.$el);
        self.$el.html(templete["airReport/airReport"]());
        self.$el.find('#airReportTabs').html(templete["airReport/airReportTabs"]());
        self.$el.find('#airReportIcon').html(templete["airReport/airReportIcon"]());

    },
    dailyReportBind: function (reqType, todayDate,label) {
        var self =this;

        App.model.dailyReport.fetch({
            method: "GET",
            headers: {
                "Authorization": App.vars.token,
                "Content-Type": "application/json",
                "company": "school"
            },
            data: {
                "reqType": reqType,
                "reqDate": todayDate,

            },
            //data: JSON.stringify(App.vars.oDeviceId),
            success: function (model, response) {
                console.log('@ App.model.dailyReport');
                console.log(response.reportList);




                self.oDailyReport = response;
                self.$el.find('#airReportTabsContents').html(templete["airReport/airReportContents"](self.oDailyReport.reportList));

                var now= moment().format('YYYY-MM-DD');
                var text = todayDate;
                var date =moment(now,'YYYY-MM-DD').diff(text, 'days');

                if( date === 0) {
                    $('.box_bottom_nav span')[0].innerText = "오늘"
                }else if(date === 1){
                    $('.box_bottom_nav span')[0].innerText = "어제"
                }else{
                    $('.box_bottom_nav span')[0].innerText = moment(todayDate,'YYYY-MM-DD').format('M월 D일')+", "+label;
                }


                $('.score_title')[0].innerText = moment(todayDate,'YYYY-MM-DD').format('M월 D일')+"의 평균";




                if(reqType !== "000"){
                    $('.score_desc em').removeClass('score');
                }

                $('._yesterday').show();
                var now = moment().format('MM.DD');

                if(now === moment(todayDate,'YYYY-MM-DD').format('MM.DD') || $('.box_bottom_nav span')[0].innerText === "오늘" ){
                    $('._tomorrow').hide();
                }else{
                    $('._tomorrow').show();
                }
                self.airReportDailyBind(reqType,todayDate);

                App.util.hideLoading();
            },
            complete: function () {
                App.util.hideLoading();
            },
            error: function (e, response) {
                /*App.util.toast(response.responseJSON.resultMsg)*/
                //alert("서버 데이터 조회에 실패하였습니다");
                /*App.util.hideLoading();*/
                App.util.openNetworkErrorPopup();

            }
        });
    },
    weeklyReportBind: function (reqType) {

        var self =this;

        var today = moment().subtract(6,'days').format('YYYY-MM-DD');
        App.model.weeklyReport.fetch({
            method: "GET",
            headers: {
                "Authorization": App.vars.token,
                "Content-Type": "application/json",
                "company": "school"
            },
            data: {
                "reqType": reqType,
                "reqDate": today,

            },
            //data: JSON.stringify(App.vars.oDeviceId),
            success: function (model, response) {
                console.log('@ App.model.weeklyReport');
                console.log(response.reportList);


                self.oWeeklyReport = response;

                self.$el.find('#airReportTabsContents').html(templete["airReport/airReportContents"](self.oWeeklyReport.reportList));
                $('.score_title')[0].innerText = "주간 평균";
                if(reqType !== "000"){
                    $('.score_desc em').removeClass('score');
                }
                $('._yesterday').hide();
                $('._tomorrow').hide();
                $('.box_bottom_nav span')[0].innerText = "지난주";

                self.airReportWeeklyBind(reqType);

                App.util.hideLoading();
            },
            complete: function () {
                App.util.hideLoading();
            },
            error: function (e, response) {
                /*App.util.toast(response.responseJSON.resultMsg)*/
                //alert("서버 데이터 조회에 실패하였습니다");
                /*App.util.hideLoading();*/
                App.util.openNetworkErrorPopup();

            }
        });
    },

    monthlyReportBind: function (reqType) {
        var self =this;

        var today = moment().format('YYYY-MM-DD');
        App.model.monthlyReport.fetch({
            method: "GET",
            headers: {
                "Authorization": App.vars.token,
                "Content-Type": "application/json",
                "company": "school"
            },
            data: {
                "reqType": reqType,
                "reqDate": today,

            },
            //data: JSON.stringify(App.vars.oDeviceId),
            success: function (model, response) {
                console.log('@ App.model.monthlyReport');
                console.log(response.reportList);


                self.oMonthlyReport = response;

                self.$el.find('#airReportTabsContents').html(templete["airReport/airReportContents"](self.oMonthlyReport.reportList));
                $('.score_title')[0].innerText = "월간 평균";
                if(reqType !== "000"){
                    $('.score_desc em').removeClass('score');
                }
                $('._yesterday').hide();
                $('._tomorrow').hide();
                $('.box_bottom_nav span')[0].innerText = "이번달";

                self.airReportMonthlyBind(reqType);

                App.util.hideLoading();
            },
            complete: function () {
                App.util.hideLoading();
            },
            error: function (e, response) {
                /*App.util.toast(response.responseJSON.resultMsg)*/
                //alert("서버 데이터 조회에 실패하였습니다");
                /*App.util.hideLoading();*/
                App.util.openNetworkErrorPopup();

            }
        });
    },

    yearlyReportBind: function (reqType) {
        var self =this;

        var today = moment().format('YYYY-MM-DD');

        //todo 연간 데이터 조회 api 정의

        App.model.dailyReport.fetch({
            method: "GET",
            headers: {
                "Authorization": App.vars.token,
                "Content-Type": "application/json",
                "company": "school"
            },
            data: {
                "reqType": reqType,
                "reqDate": today,

            },
            //data: JSON.stringify(App.vars.oDeviceId),
            success: function (model, response) {
                console.log('@ App.model.yearlyReport');
                console.log(response.reportList);


                self.oYearlyReport = response;



                self.$el.find('#airReportTabsContents').html(templete["airReport/airReportContents"](self.oYearlyReport.reportList));
                $('.score_title')[0].innerText = "연간 평균";
                if(reqType !== "000"){
                    $('.score_desc em').removeClass('score');
                }
                $('.score_desc')[0].innerText = "-"
                $('._yesterday').hide();
                $('._tomorrow').hide();
                var today = moment().format('YYYY');
                $('.box_bottom_nav span')[0].innerText = today+"년";

                self.airReportYearlyBind(reqType);

                App.util.hideLoading();
            },
            complete: function () {
                App.util.hideLoading();
            },
            error: function (e, response) {
                /*App.util.toast(response.responseJSON.resultMsg)*/
                //alert("서버 데이터 조회에 실패하였습니다");
                /*App.util.hideLoading();*/
                App.util.openNetworkErrorPopup();

            }
        });
    },
    airReportDailyBind: function (reqType,todayDate) {

        var self =this;


        var hid = App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].rtnDvcId;

        self.airReportDaily = {
            "hid":hid,
            "searchDateType" : "10",
            "sesrchDate" : todayDate,
        }
        App.model.airReport.fetch({
            method: "POST",
            headers: {
                "Authorization": App.vars.token,
                "Content-Type": "application/json",
                "company": "school"
            },

            data: JSON.stringify(self.airReportDaily),
            success: function (model, response) {
                console.log('@ App.model.airReportDaily');
                console.log(response);


                App.vars.airReportDailyResponse = response;

                self.airReportDailyGraph(App.vars.airReportDailyResponse, reqType);
                //self.airReportGraph(App.vars.airReportResponse);

                App.util.hideLoading();
            },
            complete: function () {
                App.util.hideLoading();
            },
            error: function (e, response) {
                /*App.util.toast(response.responseJSON.resultMsg)*/
                //alert("서버 데이터 조회에 실패하였습니다");
                /*App.util.hideLoading();*/
                App.util.openNetworkErrorPopup();

            }
        });
    },
    airReportWeeklyBind: function (reqType) {

        var self =this;

        var hid = App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].rtnDvcId;
        var searchStartDate = moment().subtract(7,'days').format('YYYYMMDD');
        var searchEndDate = moment().format('YYYYMMDD');

        self.airReportWeekly = {
            "hid": hid,
            "searchDateType" : "20",
            "searchStartDate" : searchStartDate,
            "searchEndDate" : searchEndDate
        }
        App.model.airReport.fetch({
            method: "POST",
            headers: {
                "Authorization": App.vars.token,
                "Content-Type": "application/json",
                "company": "school"
            },

            data: JSON.stringify(self.airReportWeekly),
            success: function (model, response) {
                console.log('@ App.model.airReportWeekly');
                console.log(response);


                App.vars.airReportWeeklyResponse = response;
                self.airReportWeeklyGraph(App.vars.airReportWeeklyResponse , reqType);
                //self.airReportGraph(App.vars.airReportResponse);

                App.util.hideLoading();
            },
            complete: function () {
                App.util.hideLoading();
            },
            error: function (e, response) {
                /*App.util.toast(response.responseJSON.resultMsg)*/
                //alert("서버 데이터 조회에 실패하였습니다");
                /*App.util.hideLoading();*/
                App.util.openNetworkErrorPopup();

            }
        });
    },
    airReportMonthlyBind: function (reqType) {

        var self =this;

        var hid = App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].rtnDvcId;
        var startMonth = moment().date(1).format('YYYYMMDD');
        var endMonth = moment().add('months', 1).date(0).format('YYYYMMDD');

        self.airReportMonthly = {
            "hid": hid,
            "searchDateType" : "30",
            "searchStartDate" : startMonth,
            "searchEndDate" : endMonth
        }
        App.model.airReport.fetch({
            method: "POST",
            headers: {
                "Authorization": App.vars.token,
                "Content-Type": "application/json",
                "company": "school"
            },

            data: JSON.stringify(self.airReportMonthly),
            success: function (model, response) {
                console.log('@ App.model.airReportMonthly');
                console.log(response);


                App.vars.airReportMonthlyResponse = response;
                self.airReportMonthlyGraph(App.vars.airReportMonthlyResponse, reqType);
                //self.airReportGraph(App.vars.airReportResponse);

                App.util.hideLoading();
            },
            complete: function () {
                App.util.hideLoading();
            },
            error: function (e, response) {
                /*App.util.toast(response.responseJSON.resultMsg)*/
                //alert("서버 데이터 조회에 실패하였습니다");
                /*App.util.hideLoading();*/
                App.util.openNetworkErrorPopup();

            }
        });
    },
    airReportYearlyBind: function (reqType) {

        var self =this;

        var hid = App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].rtnDvcId;
        var searchStartDate = moment().subtract(7,'days').format('YYYYMMDD');
        var searchEndDate = moment().format('YYYYMMDD');

        self.airReportYearly = {
            "hid": hid,
            "searchDateType" : "40",
            "searchStartDate" : searchStartDate,
            "searchEndDate" : searchEndDate
        }
        App.model.airReport.fetch({
            method: "POST",
            headers: {
                "Authorization": App.vars.token,
                "Content-Type": "application/json",
                "company": "school"
            },

            data: JSON.stringify(self.airReportYearly),
            success: function (model, response) {
                console.log('@ App.model.airReportYearly');
                console.log(response);


                App.vars.airReportYearlyResponse = response;
                self.airReportYearlyGraph(App.vars.airReportYearlyResponse, reqType);
                //self.airReportGraph(App.vars.airReportResponse);

                App.util.hideLoading();
            },
            complete: function () {
                App.util.hideLoading();
            },
            error: function (e, response) {
                /*App.util.toast(response.responseJSON.resultMsg)*/
                //alert("서버 데이터 조회에 실패하였습니다");
                /*App.util.hideLoading();*/
                App.util.openNetworkErrorPopup();

            }
        });
    },

    airReportDailyGraph: function (response, reqType) {

        console.log(response, reqType);

        var minScore = null;
        var maxScore = null;
        var score = [];
        var minTemp = null;
        var maxTemp = null;
        var temp = [];
        var minHumi = null;
        var maxHumi = null;
        var humi = [];
        var minCo2 = null;
        var maxCo2 = null;
        var co2 =  [];
        var minPm10 = null;
        var maxPm10 = null;
        var pm10 = [];
        var minChem = null;
        var maxChem = null;
        var chem = [];
        var airReportData = [];
        var maxData = [];
        var minData = [];

        response.report.reportData.forEach(function (a, i) {
            score.push(a.clean *1)
            temp.push(a.temp * 1);
            humi.push(a.humi * 1);
            co2.push(a.co2 * 1);
            pm10.push(a.pm10 * 1);
            chem.push(a.chem * 1);

        });

        if(reqType === "000"){
            airReportData = score;

            for (var j = 0; j < score.length; j++) {
                if (score[j] != null) {
                    if (minScore >= score[j] || minScore == null) {
                        minScore = score[j];
                    }
                    if (maxScore < score[j] || maxScore == null) {
                        maxScore = score[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minScore != null) {
                minIndex = score.indexOf(minScore);
            }
            if (maxScore != null) {
                maxIndex = score.indexOf(maxScore);
            }

            minData = score[minIndex] = {
                y: score[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = score[maxIndex] = {
                y: score[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };



        }else if (reqType === "001"){
            airReportData = temp;

            for (var j = 0; j < temp.length; j++) {
                if (temp[j] != null) {
                    if (minTemp >= temp[j] || minTemp == null) {
                        minTemp = temp[j];
                    }
                    if (maxTemp < temp[j] || maxTemp == null) {
                        maxTemp = temp[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minTemp != null) {
                minIndex = temp.indexOf(minTemp);
            }
            if (maxTemp != null) {
                maxIndex = temp.indexOf(maxTemp);
            }

            minData = temp[minIndex] = {
                y: temp[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = temp[maxIndex] = {
                y: temp[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "002"){
            airReportData = humi;

            for (var j = 0; j < humi.length; j++) {
                if (humi[j] != null) {
                    if (minHumi >= humi[j] || minHumi == null) {
                        minHumi = humi[j];
                    }
                    if (maxHumi < humi[j] || maxHumi == null) {
                        maxHumi = humi[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minHumi != null) {
                minIndex = humi.indexOf(minHumi);
            }
            if (maxHumi != null) {
                maxIndex = humi.indexOf(maxHumi);
            }

            minData = humi[minIndex] = {
                y: humi[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = humi[maxIndex] = {
                y: humi[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "003"){
            airReportData = co2;

            for (var j = 0; j < co2.length; j++) {
                if (co2[j] != null) {
                    if (minCo2 >= co2[j] || minCo2 == null) {
                        minCo2 = co2[j];
                    }
                    if (maxCo2 < co2[j] || maxCo2 == null) {
                        maxCo2 = co2[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minCo2 != null) {
                minIndex = co2.indexOf(minCo2);
            }
            if (maxCo2 != null) {
                maxIndex = co2.indexOf(maxCo2);
            }

            minData = co2[minIndex] = {
                y: co2[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = co2[maxIndex] = {
                y: co2[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "004"){
            airReportData = chem;

            for (var j = 0; j < chem.length; j++) {
                if (chem[j] != null) {
                    if (minChem >= chem[j] || minChem == null) {
                        minChem = chem[j];
                    }
                    if (maxChem < chem[j] || maxChem == null) {
                        maxChem = chem[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minChem != null) {
                minIndex = chem.indexOf(minChem);
            }
            if (maxChem != null) {
                maxIndex = chem.indexOf(maxChem);
            }

            minData = chem[minIndex] = {
                y: chem[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = chem[maxIndex] = {
                y: chem[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "005"){
            airReportData = pm10;

            for (var j = 0; j < pm10.length; j++) {
                if (pm10[j] != null) {
                    if (minPm10 >= pm10[j] || minPm10 == null) {
                        minPm10 = pm10[j];
                    }
                    if (maxPm10 < pm10[j] || maxPm10 == null) {
                        maxPm10 = pm10[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minPm10 != null) {
                minIndex = pm10.indexOf(minPm10);
            }
            if (maxPm10 != null) {
                maxIndex = pm10.indexOf(maxPm10);
            }

            minData = pm10[minIndex] = {
                y: pm10[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = pm10[maxIndex] = {
                y: pm10[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
        }

        console.log(airReportData);



        $('.box_chart').highcharts({
            chart: {
                type: 'line',
                spacingTop:0,


            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                min: 00,
                max: 24,
                tickInterval: 6,
                tickWidth: 0,
                minorTickInterval: 2,
                gridLineWidth: 1.5,
                lineWidth:0,
                title: {
                    enabled: false

                }
            },
            legend: {
                enabled: false
            },
            yAxis: {

                reversed: false,
                gridLineWidth: 0,
                tickWidth: 0,
                labels: {
                    style: {
                        enabled: false,
                        text: '',
                        fontSize: "0px"
                    }
                },

                title: {
                    enabled: false,
                    text: '',

                }
            },
            allowHTML: true,
            annotations: [{
                labelOptions: {
                    useHTML :true,
                    format:'<div class="tooltip-marker-report-high"><a href="#">'+ minData.y+'</a></div>',
                    backgroundColor: 'transparent',
                    //verticalAlign: 'bottom',
                    //padding:6,
                    borderWidth: 0,
                    x:8,
                    y:-20
                },
                zIndex:0,
                labels: [{
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: minIndex,
                        y: minData.y
                    }
                }]
            },{
                labelOptions: {
                    useHTML :true,
                    format:'<div class="tooltip-marker-report-low"><a href="#">'+maxData.y+'</a></div>',
                    backgroundColor: 'transparent',
                    //verticalAlign: 'bottom',
                    //padding:6,
                    borderWidth: 0,
                    x:-18,
                    y:13
                    //borderColor:'rgba(0,0,0,0)',
                    //distance:-20
                },
                labels: [{
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: maxIndex,
                        y: maxData.y
                    },
                    style: {
                        fontSize: '10px',
                    }
                }]
            }
            ],
            series: [{
                color: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#afd819'],
                        [0.33, '#a5cc16'],
                        [0.66, '#e1563e'],
                        [1, '#e1423e']
                    ]
                },
                marker: {
                    enabled: false,
                    'symbol': 'circle',
                    color: '#000',
                    fillColor: '#000',
                    radius:2
                },
                data: airReportData /*[77, 76.2,{y: 75.4, marker: {enabled: true,radius: 3}, color: '#706464'},75.9, 76.4 ,78.6, 80.8, 81.75, 82.7, 82.35, 82,
                    83.15 , {y: 84.3, marker: {enabled: true,radius: 3}, color: '#706464'}, 83.65, 83, 83.4 , 83.8 ]*/


            }]
        });
    },

    airReportWeeklyGraph: function (response, reqType) {

        console.log(response, reqType);

        var minScore = null;
        var maxScore = null;
        var score = [];
        var minTemp = null;
        var maxTemp = null;
        var temp = [];
        var minHumi = null;
        var maxHumi = null;
        var humi = [];
        var minCo2 = null;
        var maxCo2 = null;
        var co2 =  [];
        var minPm10 = null;
        var maxPm10 = null;
        var pm10 = [];
        var minChem = null;
        var maxChem = null;
        var chem = [];
        var airReportData = [];
        var maxData = [];
        var minData = [];

        response.report.reportData.forEach(function (a, i) {
            score.push(a.clean *1)
            temp.push(a.temp * 1);
            humi.push(a.humi * 1);
            co2.push(a.co2 * 1);
            pm10.push(a.pm10 * 1);
            chem.push(a.chem * 1);

        });

        if(reqType === "000"){
            airReportData = score;

            for (var j = 0; j < score.length; j++) {
                if (score[j] != null) {
                    if (minScore >= score[j] || minScore == null) {
                        minScore = score[j];
                    }
                    if (maxScore < score[j] || maxScore == null) {
                        maxScore = score[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minScore != null) {
                minIndex = score.indexOf(minScore);
            }
            if (maxScore != null) {
                maxIndex = score.indexOf(maxScore);
            }

            minData = score[minIndex] = {
                y: score[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = score[maxIndex] = {
                y: score[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };



        }else if (reqType === "001"){
            airReportData = temp;

            for (var j = 0; j < temp.length; j++) {
                if (temp[j] != null) {
                    if (minTemp >= temp[j] || minTemp == null) {
                        minTemp = temp[j];
                    }
                    if (maxTemp < temp[j] || maxTemp == null) {
                        maxTemp = temp[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minTemp != null) {
                minIndex = temp.indexOf(minTemp);
            }
            if (maxTemp != null) {
                maxIndex = temp.indexOf(maxTemp);
            }

            minData = temp[minIndex] = {
                y: temp[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = temp[maxIndex] = {
                y: temp[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "002"){
            airReportData = humi;

            for (var j = 0; j < humi.length; j++) {
                if (humi[j] != null) {
                    if (minHumi >= humi[j] || minHumi == null) {
                        minHumi = humi[j];
                    }
                    if (maxHumi < humi[j] || maxHumi == null) {
                        maxHumi = humi[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minHumi != null) {
                minIndex = humi.indexOf(minHumi);
            }
            if (maxHumi != null) {
                maxIndex = humi.indexOf(maxHumi);
            }

            minData = humi[minIndex] = {
                y: humi[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = humi[maxIndex] = {
                y: humi[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "003"){
            airReportData = co2;

            for (var j = 0; j < co2.length; j++) {
                if (co2[j] != null) {
                    if (minCo2 >= co2[j] || minCo2 == null) {
                        minCo2 = co2[j];
                    }
                    if (maxCo2 < co2[j] || maxCo2 == null) {
                        maxCo2 = co2[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minCo2 != null) {
                minIndex = co2.indexOf(minCo2);
            }
            if (maxCo2 != null) {
                maxIndex = co2.indexOf(maxCo2);
            }

            minData = co2[minIndex] = {
                y: co2[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = co2[maxIndex] = {
                y: co2[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "004"){
            airReportData = chem;

            for (var j = 0; j < chem.length; j++) {
                if (chem[j] != null) {
                    if (minChem >= chem[j] || minChem == null) {
                        minChem = chem[j];
                    }
                    if (maxChem < chem[j] || maxChem == null) {
                        maxChem = chem[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minChem != null) {
                minIndex = chem.indexOf(minChem);
            }
            if (maxChem != null) {
                maxIndex = chem.indexOf(maxChem);
            }

            minData = chem[minIndex] = {
                y: chem[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = chem[maxIndex] = {
                y: chem[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "005"){
            airReportData = pm10;

            for (var j = 0; j < pm10.length; j++) {
                if (pm10[j] != null) {
                    if (minPm10 >= pm10[j] || minPm10 == null) {
                        minPm10 = pm10[j];
                    }
                    if (maxPm10 < pm10[j] || maxPm10 == null) {
                        maxPm10 = pm10[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minPm10 != null) {
                minIndex = pm10.indexOf(minPm10);
            }
            if (maxPm10 != null) {
                maxIndex = pm10.indexOf(maxPm10);
            }

            minData = pm10[minIndex] = {
                y: pm10[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = pm10[maxIndex] = {
                y: pm10[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
        }

        console.log(airReportData);



        $('.box_chart').highcharts({
            chart: {
                type: 'line',
                spacingTop:0,


            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['일','월', '화', '수', '목', '금', '토'],
                //tickInterval: 1,
                //tickWidth: 1,
                gridLineWidth: 1,
                lineWidth:0,
                title: {
                    enabled: false

                }
            },
            legend: {
                enabled: false
            },
            yAxis: {

                reversed: false,
                gridLineWidth: 0,
                tickWidth: 0,
                labels: {
                    style: {
                        enabled: false,
                        text: '',
                        fontSize: "0px"
                    }
                },

                title: {
                    enabled: false,
                    text: '',

                }
            },
            allowHTML: true,
            annotations: [{
                labelOptions: {
                    useHTML :true,
                    format:'<div class="tooltip-marker-report-high"><a href="#">'+ minData.y+'</a></div>',
                    backgroundColor: 'transparent',
                    //verticalAlign: 'bottom',
                    //padding:6,
                    borderWidth: 0,
                    x:8,
                    y:-20
                },
                zIndex:0,
                labels: [{
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: minIndex,
                        y: minData.y
                    }
                }]
            },{
                labelOptions: {
                    useHTML :true,
                    format:'<div class="tooltip-marker-report-low"><a href="#">'+maxData.y+'</a></div>',
                    backgroundColor: 'transparent',
                    //verticalAlign: 'bottom',
                    //padding:6,
                    borderWidth: 0,
                    x:-18,
                    y:13
                    //borderColor:'rgba(0,0,0,0)',
                    //distance:-20
                },
                labels: [{
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: maxIndex,
                        y: maxData.y
                    },
                    style: {
                        fontSize: '10px',
                    }
                }]
            }
            ],
            series: [{
                /*type: 'areaspline',
                color: '#d3d4d7',
                fillColor: '#f6f7f9',
                marker: {
                    enabled: false,
                    radius:2
                },
                dataLabels : {
                    enabled: false
                },*/

                color: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#afd819'],
                        [0.33, '#a5cc16'],
                        [0.66, '#e1563e'],
                        [1, '#e1423e']
                    ]
                },
                marker: {
                    enabled: false,
                    'symbol': 'circle',
                    color: '#000',
                    fillColor: '#000',
                    radius:2
                },
                data: airReportData /*[77, 76.2,{y: 75.4, marker: {enabled: true,radius: 3}, color: '#706464'},75.9, 76.4 ,78.6, 80.8, 81.75, 82.7, 82.35, 82,
                    83.15 , {y: 84.3, marker: {enabled: true,radius: 3}, color: '#706464'}, 83.65, 83, 83.4 , 83.8 ]*/


            }]
        });
    },
    airReportMonthlyGraph: function (response, reqType) {

        console.log(response, reqType);

        var label = [];
        var minScore = null;
        var maxScore = null;
        var score = [];
        var minTemp = null;
        var maxTemp = null;
        var temp = [];
        var minHumi = null;
        var maxHumi = null;
        var humi = [];
        var minCo2 = null;
        var maxCo2 = null;
        var co2 =  [];
        var minPm10 = null;
        var maxPm10 = null;
        var pm10 = [];
        var minChem = null;
        var maxChem = null;
        var chem = [];
        var airReportData = [];
        var maxData = [];
        var minData = [];

        response.report.reportData.forEach(function (a, i) {
            label.push(a.label *1);
            score.push(a.clean *1)
            temp.push(a.temp * 1);
            humi.push(a.humi * 1);
            co2.push(a.co2 * 1);
            pm10.push(a.pm10 * 1);
            chem.push(a.chem * 1);

        });

        if(reqType === "000"){
            airReportData = score;

            for (var j = 0; j < score.length; j++) {
                if (score[j] != null) {
                    if (minScore >= score[j] || minScore == null) {
                        minScore = score[j];
                    }
                    if (maxScore < score[j] || maxScore == null) {
                        maxScore = score[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minScore != null) {
                minIndex = score.indexOf(minScore);
            }
            if (maxScore != null) {
                maxIndex = score.indexOf(maxScore);
            }

            minData = score[minIndex] = {
                y: score[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = score[maxIndex] = {
                y: score[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };



        }else if (reqType === "001"){
            airReportData = temp;

            for (var j = 0; j < temp.length; j++) {
                if (temp[j] != null) {
                    if (minTemp >= temp[j] || minTemp == null) {
                        minTemp = temp[j];
                    }
                    if (maxTemp < temp[j] || maxTemp == null) {
                        maxTemp = temp[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minTemp != null) {
                minIndex = temp.indexOf(minTemp);
            }
            if (maxTemp != null) {
                maxIndex = temp.indexOf(maxTemp);
            }

            minData = temp[minIndex] = {
                y: temp[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = temp[maxIndex] = {
                y: temp[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "002"){
            airReportData = humi;

            for (var j = 0; j < humi.length; j++) {
                if (humi[j] != null) {
                    if (minHumi >= humi[j] || minHumi == null) {
                        minHumi = humi[j];
                    }
                    if (maxHumi < humi[j] || maxHumi == null) {
                        maxHumi = humi[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minHumi != null) {
                minIndex = humi.indexOf(minHumi);
            }
            if (maxHumi != null) {
                maxIndex = humi.indexOf(maxHumi);
            }

            minData = humi[minIndex] = {
                y: humi[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = humi[maxIndex] = {
                y: humi[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "003"){
            airReportData = co2;

            for (var j = 0; j < co2.length; j++) {
                if (co2[j] != null) {
                    if (minCo2 >= co2[j] || minCo2 == null) {
                        minCo2 = co2[j];
                    }
                    if (maxCo2 < co2[j] || maxCo2 == null) {
                        maxCo2 = co2[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minCo2 != null) {
                minIndex = co2.indexOf(minCo2);
            }
            if (maxCo2 != null) {
                maxIndex = co2.indexOf(maxCo2);
            }

            minData = co2[minIndex] = {
                y: co2[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = co2[maxIndex] = {
                y: co2[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "004"){
            airReportData = chem;

            for (var j = 0; j < chem.length; j++) {
                if (chem[j] != null) {
                    if (minChem >= chem[j] || minChem == null) {
                        minChem = chem[j];
                    }
                    if (maxChem < chem[j] || maxChem == null) {
                        maxChem = chem[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minChem != null) {
                minIndex = chem.indexOf(minChem);
            }
            if (maxChem != null) {
                maxIndex = chem.indexOf(maxChem);
            }

            minData = chem[minIndex] = {
                y: chem[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = chem[maxIndex] = {
                y: chem[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "005"){
            airReportData = pm10;

            for (var j = 0; j < pm10.length; j++) {
                if (pm10[j] != null) {
                    if (minPm10 >= pm10[j] || minPm10 == null) {
                        minPm10 = pm10[j];
                    }
                    if (maxPm10 < pm10[j] || maxPm10 == null) {
                        maxPm10 = pm10[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minPm10 != null) {
                minIndex = pm10.indexOf(minPm10);
            }
            if (maxPm10 != null) {
                maxIndex = pm10.indexOf(maxPm10);
            }

            minData = pm10[minIndex] = {
                y: pm10[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = pm10[maxIndex] = {
                y: pm10[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
        }

        console.log(airReportData);



        $('.box_chart').highcharts({
            chart: {
                type: 'line',
                spacingTop:0,


            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: label,
                //tickInterval: 1,
                //tickWidth: 1,
                gridLineWidth: 1,
                lineWidth:0,
                title: {
                    enabled: false

                },
                labels: {
                    format: '{value}일'
                }
            },
            legend: {
                enabled: false
            },
            yAxis: {

                reversed: false,
                gridLineWidth: 0,
                tickWidth: 0,
                labels: {
                    style: {
                        enabled: false,
                        text: '',
                        fontSize: "0px"
                    }
                },

                title: {
                    enabled: false,
                    text: '',

                }
            },
            allowHTML: true,
            annotations: [{
                labelOptions: {
                    useHTML :true,
                    format:'<div class="tooltip-marker-report-high"><a href="#">'+ minData.y+'</a></div>',
                    backgroundColor: 'transparent',
                    //verticalAlign: 'bottom',
                    //padding:6,
                    borderWidth: 0,
                    x:8,
                    y:-20
                },
                zIndex:0,
                labels: [{
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: minIndex,
                        y: minData.y
                    }
                }]
            },{
                labelOptions: {
                    useHTML :true,
                    format:'<div class="tooltip-marker-report-low"><a href="#">'+maxData.y+'</a></div>',
                    backgroundColor: 'transparent',
                    //verticalAlign: 'bottom',
                    //padding:6,
                    borderWidth: 0,
                    x:-18,
                    y:13
                    //borderColor:'rgba(0,0,0,0)',
                    //distance:-20
                },
                labels: [{
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: maxIndex,
                        y: maxData.y
                    },
                    style: {
                        fontSize: '10px',
                    }
                }]
            }
            ],
            series: [{
                /*type: 'areaspline',
                color: '#d3d4d7',
                fillColor: '#f6f7f9',
                marker: {
                    enabled: false,
                    radius:2
                },
                dataLabels : {
                    enabled: false
                },*/

                color: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#afd819'],
                        [0.33, '#a5cc16'],
                        [0.66, '#e1563e'],
                        [1, '#e1423e']
                    ]
                },
                marker: {
                    enabled: false,
                    'symbol': 'circle',
                    color: '#000',
                    fillColor: '#000',
                    radius:2
                },
                data: airReportData /*[77, 76.2,{y: 75.4, marker: {enabled: true,radius: 3}, color: '#706464'},75.9, 76.4 ,78.6, 80.8, 81.75, 82.7, 82.35, 82,
                    83.15 , {y: 84.3, marker: {enabled: true,radius: 3}, color: '#706464'}, 83.65, 83, 83.4 , 83.8 ]*/


            }]
        });
    },
    airReportYearlyGraph: function (response, reqType) {

        console.log(response, reqType);

        var label = [];
        var minScore = null;
        var maxScore = null;
        var score = [];
        var minTemp = null;
        var maxTemp = null;
        var temp = [];
        var minHumi = null;
        var maxHumi = null;
        var humi = [];
        var minCo2 = null;
        var maxCo2 = null;
        var co2 =  [];
        var minPm10 = null;
        var maxPm10 = null;
        var pm10 = [];
        var minChem = null;
        var maxChem = null;
        var chem = [];
        var airReportData = [];
        var maxData = [];
        var minData = [];

        response.report.reportData.forEach(function (a, i) {
            label.push(a.label *1);
            score.push(a.clean *1)
            temp.push(a.temp * 1);
            humi.push(a.humi * 1);
            co2.push(a.co2 * 1);
            pm10.push(a.pm10 * 1);
            chem.push(a.chem * 1);

        });

        if(reqType === "000"){
            airReportData = score;

            for (var j = 0; j < score.length; j++) {
                if (score[j] != null) {
                    if (minScore >= score[j] || minScore == null) {
                        minScore = score[j];
                    }
                    if (maxScore < score[j] || maxScore == null) {
                        maxScore = score[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minScore != null) {
                minIndex = score.indexOf(minScore);
            }
            if (maxScore != null) {
                maxIndex = score.indexOf(maxScore);
            }

            minData = score[minIndex] = {
                y: score[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = score[maxIndex] = {
                y: score[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };



        }else if (reqType === "001"){
            airReportData = temp;

            for (var j = 0; j < temp.length; j++) {
                if (temp[j] != null) {
                    if (minTemp >= temp[j] || minTemp == null) {
                        minTemp = temp[j];
                    }
                    if (maxTemp < temp[j] || maxTemp == null) {
                        maxTemp = temp[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minTemp != null) {
                minIndex = temp.indexOf(minTemp);
            }
            if (maxTemp != null) {
                maxIndex = temp.indexOf(maxTemp);
            }

            minData = temp[minIndex] = {
                y: temp[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = temp[maxIndex] = {
                y: temp[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "002"){
            airReportData = humi;

            for (var j = 0; j < humi.length; j++) {
                if (humi[j] != null) {
                    if (minHumi >= humi[j] || minHumi == null) {
                        minHumi = humi[j];
                    }
                    if (maxHumi < humi[j] || maxHumi == null) {
                        maxHumi = humi[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minHumi != null) {
                minIndex = humi.indexOf(minHumi);
            }
            if (maxHumi != null) {
                maxIndex = humi.indexOf(maxHumi);
            }

            minData = humi[minIndex] = {
                y: humi[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = humi[maxIndex] = {
                y: humi[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "003"){
            airReportData = co2;

            for (var j = 0; j < co2.length; j++) {
                if (co2[j] != null) {
                    if (minCo2 >= co2[j] || minCo2 == null) {
                        minCo2 = co2[j];
                    }
                    if (maxCo2 < co2[j] || maxCo2 == null) {
                        maxCo2 = co2[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minCo2 != null) {
                minIndex = co2.indexOf(minCo2);
            }
            if (maxCo2 != null) {
                maxIndex = co2.indexOf(maxCo2);
            }

            minData = co2[minIndex] = {
                y: co2[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = co2[maxIndex] = {
                y: co2[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "004"){
            airReportData = chem;

            for (var j = 0; j < chem.length; j++) {
                if (chem[j] != null) {
                    if (minChem >= chem[j] || minChem == null) {
                        minChem = chem[j];
                    }
                    if (maxChem < chem[j] || maxChem == null) {
                        maxChem = chem[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minChem != null) {
                minIndex = chem.indexOf(minChem);
            }
            if (maxChem != null) {
                maxIndex = chem.indexOf(maxChem);
            }

            minData = chem[minIndex] = {
                y: chem[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = chem[maxIndex] = {
                y: chem[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };

        }else if (reqType === "005"){
            airReportData = pm10;

            for (var j = 0; j < pm10.length; j++) {
                if (pm10[j] != null) {
                    if (minPm10 >= pm10[j] || minPm10 == null) {
                        minPm10 = pm10[j];
                    }
                    if (maxPm10 < pm10[j] || maxPm10 == null) {
                        maxPm10 = pm10[j];
                    }
                }
            }

            var minIndex;
            var maxIndex;

            if (minPm10 != null) {
                minIndex = pm10.indexOf(minPm10);
            }
            if (maxPm10 != null) {
                maxIndex = pm10.indexOf(maxPm10);
            }

            minData = pm10[minIndex] = {
                y: pm10[minIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
            maxData = pm10[maxIndex] = {
                y: pm10[maxIndex],
                marker: {enabled: true, radius: 3},
                color: '#000000'
            };
        }

        console.log(airReportData);



        $('.box_chart').highcharts({
            chart: {
                type: 'line',
                spacingTop:0,


            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: label,
                //tickInterval: 1,
                //tickWidth: 1,
                gridLineWidth: 1,
                lineWidth:0,
                title: {
                    enabled: false

                },
                labels: {
                    format: '{value}월'
                }
            },
            legend: {
                enabled: false
            },
            yAxis: {

                reversed: false,
                gridLineWidth: 0,
                tickWidth: 0,
                labels: {
                    style: {
                        enabled: false,
                        text: '',
                        fontSize: "0px"
                    }
                },

                title: {
                    enabled: false,
                    text: '',

                }
            },
            allowHTML: true,
            annotations: [{
                labelOptions: {
                    useHTML :true,
                    format:'<div class="tooltip-marker-report-high"><a href="#">'+ minData.y+'</a></div>',
                    backgroundColor: 'transparent',
                    //verticalAlign: 'bottom',
                    //padding:6,
                    borderWidth: 0,
                    x:8,
                    y:-20
                },
                zIndex:0,
                labels: [{
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: minIndex,
                        y: minData.y
                    }
                }]
            },{
                labelOptions: {
                    useHTML :true,
                    format:'<div class="tooltip-marker-report-low"><a href="#">'+maxData.y+'</a></div>',
                    backgroundColor: 'transparent',
                    //verticalAlign: 'bottom',
                    //padding:6,
                    borderWidth: 0,
                    x:-18,
                    y:13
                    //borderColor:'rgba(0,0,0,0)',
                    //distance:-20
                },
                labels: [{
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: maxIndex,
                        y: maxData.y
                    },
                    style: {
                        fontSize: '10px',
                    }
                }]
            }
            ],
            series: [{
                /*type: 'areaspline',
                color: '#d3d4d7',
                fillColor: '#f6f7f9',
                marker: {
                    enabled: false,
                    radius:2
                },
                dataLabels : {
                    enabled: false
                },*/

                color: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#afd819'],
                        [0.33, '#a5cc16'],
                        [0.66, '#e1563e'],
                        [1, '#e1423e']
                    ]
                },
                marker: {
                    enabled: false,
                    'symbol': 'circle',
                    color: '#000',
                    fillColor: '#000',
                    radius:2
                },
                data: airReportData /*[77, 76.2,{y: 75.4, marker: {enabled: true,radius: 3}, color: '#706464'},75.9, 76.4 ,78.6, 80.8, 81.75, 82.7, 82.35, 82,
                    83.15 , {y: 84.3, marker: {enabled: true,radius: 3}, color: '#706464'}, 83.65, 83, 83.4 , 83.8 ]*/


            }]
        });
    }

});