directory.airPurifierNicePurifier= Backbone.View.extend({
    initialize: function () {
        //ChunghoNice
        App.view.device_nicePurifierSettingAlarm = new directory.device_nicePurifierSettingAlarm();
        App.view.device_nicePurifierSettingFilterUsed= new directory.device_nicePurifierSettingFilterUsed();
        App.view.device_nicePurifierSettingInfomation = new directory.device_nicePurifierSettingInfomation();
        App.view.device_nicePurifierSettingMode= new directory.device_nicePurifierSettingMode();
        App.view.device_nicePurifierSettingDustSensor = new directory.device_nicePurifierSettingDustSensor();
        App.view.device_nicePurifierSettingPower = new directory.device_nicePurifierSettingPower();
        App.view.device_nicePurifierSettingTurnOff = new directory.device_nicePurifierSettingTurnOff();
        App.view.device_nicePurifierSettingVolume = new directory.device_nicePurifierSettingVolume();
        App.view.device_nicePurifierSettingIon = new directory.device_nicePurifierSettingIon();
        this.render();
    },
    render: function (data) {
        var self = this;
        // 템플릿팅
        self.$el.html(templete["device_nicePurifier/device"](data));

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
                self.$el.find('#alarm').html(App.view.device_nicePurifierSettingAlarm.render(data).$el);

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
            self.$el.find('#power').html(App.view.device_nicePurifierSettingPower.render(data).$el);
            self.$el.find('#mode').html(App.view.device_nicePurifierSettingMode.render(data).$el);
            self.$el.find('#volume').html(App.view.device_nicePurifierSettingVolume.render(data).$el);
            self.$el.find('#dustsensor').html(App.view.device_nicePurifierSettingDustSensor.render(data).$el);
            //self.$el.find('#turnOff').html(App.view.device_nicePurifierSettingTurnOff.render(data).$el);
            self.$el.find('#filterUsed').html(App.view.device_nicePurifierSettingFilterUsed.render(data).$el);
            self.$el.find('#ion').html(App.view.device_nicePurifierSettingIon.render(data).$el);

            self.$el.find('#infomation').html(App.view.device_nicePurifierSettingInfomation.render(data).$el);
        } else {
            //self.$el.find('#alarm').html(App.view.device_nicePurifierSettingAlarm.render(data).$el);
            self.$el.find('#infomation').html(App.view.device_nicePurifierSettingInfomation.render(data).$el);
        }
        return self;
    }
});