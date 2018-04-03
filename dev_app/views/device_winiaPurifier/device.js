directory.airPurifierWiniaPurifier = Backbone.View.extend({
    initialize: function () {
        //WiniaPurifier
        App.view.device_winiaPurifierSettingAlarm = new directory.device_winiaPurifierSettingAlarm();
        App.view.device_winiaPurifierSettingFilterUsed = new directory.device_winiaPurifierSettingFilterUsed();
        App.view.device_winiaPurifierSettingInfomation = new directory.device_winiaPurifierSettingInfomation();
        App.view.device_winiaPurifierSettingMode = new directory.device_winiaPurifierSettingMode();
        App.view.device_winiaPurifierSettingPlasma = new directory.device_winiaPurifierSettingPlasma();
        App.view.device_winiaPurifierSettingPower = new directory.device_winiaPurifierSettingPower();
        App.view.device_winiaPurifierSettingTurnOff = new directory.device_winiaPurifierSettingTurnOff();
        App.view.device_winiaPurifierSettingVolume = new directory.device_winiaPurifierSettingVolume();
        App.view.device_winiaPurifierSettingDisinfect = new directory.device_winiaPurifierSettingDisinfect();
        App.view.device_winiaPurifierSettingHumidfy = new directory.device_winiaPurifierSettingHumidfy();
        this.render();
    },
    render: function (data) {
        var self = this;
        // 템플릿팅
        self.$el.html(templete["device_winiaPurifier/device"](data));

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
                self.$el.find('#alarm').html(App.view.device_winiaPurifierSettingAlarm.render(data).$el);

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
            self.$el.find('#power').html(App.view.device_winiaPurifierSettingPower.render(data).$el);
            self.$el.find('#mode').html(App.view.device_winiaPurifierSettingMode.render(data).$el);
            self.$el.find('#volume').html(App.view.device_winiaPurifierSettingVolume.render(data).$el);
            self.$el.find('#plasma').html(App.view.device_winiaPurifierSettingPlasma.render(data).$el);
            //self.$el.find('#turnOff').html(App.view.device_winiaPurifierSettingTurnOff.render(data).$el);
            self.$el.find('#filterUsed').html(App.view.device_winiaPurifierSettingFilterUsed.render(data).$el);
            self.$el.find('#disinfect').html(App.view.device_winiaPurifierSettingDisinfect.render(data).$el);
            self.$el.find('#humidfy').html(App.view.device_winiaPurifierSettingHumidfy.render(data).$el);

            self.$el.find('#infomation').html(App.view.device_winiaPurifierSettingInfomation.render(data).$el);
        } else {
            //self.$el.find('#alarm').html(App.view.device_winiaPurifierSettingAlarm.render(data).$el);
            self.$el.find('#infomation').html(App.view.device_winiaPurifierSettingInfomation.render(data).$el);
        }
        return self;
    }
});