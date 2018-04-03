directory.airMultiSensorHyundai = Backbone.View.extend({
    initialize: function () {
        //그린망고
        App.view.device_hyundaiAirInfo = new directory.device_hyundaiAirInfo();
        App.view.device_awairChart = new directory.device_awairChart();
        App.view.device_hyundaiMode = new directory.device_hyundaiMode();
        App.view.device_hyundaiSettingAlarm = new directory.device_hyundaiSettingAlarm();
        App.view.device_hyundaiSettingInformation = new directory.device_hyundaiSettingInformation();

        this.render();
    },
    render: function (data) {
        var self = this;
        // 템플릿팅
        self.$el.html(templete["device_hyundai/device"](data));

        App.model.deviceOpr.fetch({
            method: "GET",
            headers: {
                "Authorization": App.vars.token,
                "Content-Type": "application/json",
                "company": "school"
            },
            data: {
                "count": 1,
                "rtnDvcId": App.vars.oSchoolDetail.oDeviceInfo[App.vars.oSchoolDetail.nIdx].rtnDvcId,
                "schCd": App.vars.schCd
            },
            //data: JSON.stringify(App.vars.oDeviceId),
            success: function (model, response) {
                console.log('@ App.model.deviceOpr');
                console.log(response);

                App.vars.oSchoolDetail.oDeviceOpr = response.resultList;

                setTimeout(function () {
                    self.$el.find('#alarm').html(App.view.device_hyundaiSettingAlarm.render(data).$el);
                }, 500);

                if(App.vars.oSchoolDetail.oDeviceOpr.length == 0){
                    $('#alarm ._alarm').hide()
                }

                $('.info_desc a')[0].href = "tel:"+$('.info_desc a')[0].href.replace(/[^0-9]/g,'');
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

        self.$el.find('#airInfo').html(App.view.device_hyundaiAirInfo.render(data).$el);
        self.$el.find('#airChart').html(App.view.device_awairChart.render(data).$el);
        self.$el.find('#mode').html(App.view.device_hyundaiMode.render(data).$el);

        self.$el.find('#infomation').html(App.view.device_hyundaiSettingInformation.render(data).$el);

        return self;
    }
});