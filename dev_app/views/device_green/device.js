directory.airMultiSensorGreenMango = Backbone.View.extend({
    initialize: function () {
        //그린망고
        App.view.device_greenAirInfo = new directory.device_greenAirInfo();
        App.view.device_greenChart = new directory.device_greenChart();
        App.view.device_greenMode = new directory.device_greenMode();
        App.view.device_greenSettingAlarm = new directory.device_greenSettingAlarm();
        App.view.device_greenSettingInformation = new directory.device_greenSettingInformation();

        this.render();
    },
    render: function (data) {
        var self = this;
        // 템플릿팅
        self.$el.html(templete["device_green/device"](data));

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
                    self.$el.find('#alarm').html(App.view.device_greenSettingAlarm.render(data).$el);
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

        self.$el.find('#airInfo').html(App.view.device_greenAirInfo.render(data).$el);
        self.$el.find('#airChart').html(App.view.device_greenChart.render(data).$el);
        self.$el.find('#mode').html(App.view.device_greenMode.render(data).$el);

        self.$el.find('#infomation').html(App.view.device_greenSettingInformation.render(data).$el);

        return self;
    }
});