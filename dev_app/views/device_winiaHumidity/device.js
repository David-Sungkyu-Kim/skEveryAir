directory.airPurifierWiniaHumidfy = Backbone.View.extend({
    initialize: function () {
        //WiniaHumidfy
        App.view.device_winiaHumiditySettingAlarm = new directory.device_winiaHumiditySettingAlarm();
        App.view.device_winiaHumiditySettingFilterUsed = new directory.device_winiaHumiditySettingFilterUsed();
        App.view.device_winiaHumiditySettingInfomation = new directory.device_winiaHumiditySettingInfomation();
        App.view.device_winiaHumiditySettingMode= new directory.device_winiaHumiditySettingMode();
        App.view.device_winiaHumiditySettingPlasma = new directory.device_winiaHumiditySettingPlasma();
        App.view.device_winiaHumiditySettingPower = new directory.device_winiaHumiditySettingPower();
        App.view.device_winiaHumiditySettingTurnOff = new directory.device_winiaHumiditySettingTurnOff();
        App.view.device_winiaHumiditySettingVolume= new directory.device_winiaHumiditySettingVolume();
        this.render();
    },
    render: function (data) {
        var self = this;
        // 템플릿팅
        self.$el.html(templete["device_winiaHumidity/device"](data));

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
                self.$el.find('#alarm').html(App.view.device_winiaHumiditySettingAlarm.render(data).$el);

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

        if (App.vars.isSchoolCode === true) {
            self.$el.find('#power').html(App.view.device_winiaHumiditySettingPower.render(data).$el);
            self.$el.find('#mode').html(App.view.device_winiaHumiditySettingMode.render(data).$el);
            self.$el.find('#volume').html(App.view.device_winiaHumiditySettingVolume.render(data).$el);
            self.$el.find('#plasma').html(App.view.device_winiaHumiditySettingPlasma.render(data).$el);
            //self.$el.find('#turnOff').html(App.view.device_winiaHumiditySettingTurnOff.render(data).$el);
            self.$el.find('#filterUsed').html(App.view.device_winiaHumiditySettingFilterUsed.render(data).$el);

            self.$el.find('#infomation').html(App.view.device_winiaHumiditySettingInfomation.render(data).$el);
        } else {
            //self.$el.find('#alarm').html(App.view.device_winiaHumiditySettingAlarm.render(data).$el);
            self.$el.find('#infomation').html(App.view.device_winiaHumiditySettingInfomation.render(data).$el);
        }
        return self;
    }
});