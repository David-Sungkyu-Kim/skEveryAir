directory.airPurifierWinixTaitan = Backbone.View.extend({
    initialize: function () {
        //위닉스 타이탄
        App.view.device_winixTitanSettingAlarm = new directory.device_winixTitanSettingAlarm();
        App.view.device_winixTitanSettingFilterUsed = new directory.device_winixTitanSettingFilterUsed();
        App.view.device_winixTitanSettingInfomation = new directory.device_winixTitanSettingInfomation();
        App.view.device_winixTitanSettingMode = new directory.device_winixTitanSettingMode();
        App.view.device_winixTitanSettingPlasmaWave = new directory.device_winixTitanSettingPlasmaWave();
        App.view.device_winixTitanSettingPower = new directory.device_winixTitanSettingPower();
        App.view.device_winixTitanSettingTurnOff = new directory.device_winixTitanSettingTurnOff();
        App.view.device_winixTitanSettingVolume = new directory.device_winixTitanSettingVolume();
        this.render();
    },
    render: function (data) {
        var self = this;
        // 템플릿팅
        self.$el.html(templete["device_winixTitan/device"](data));

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
                self.$el.find('#alarm').html(App.view.device_winixTitanSettingAlarm.render(data).$el);

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
            self.$el.find('#power').html(App.view.device_winixTitanSettingPower.render(data).$el);
            self.$el.find('#mode').html(App.view.device_winixTitanSettingMode.render(data).$el);
            self.$el.find('#volume').html(App.view.device_winixTitanSettingVolume.render(data).$el);
            self.$el.find('#plasmaWave').html(App.view.device_winixTitanSettingPlasmaWave.render(data).$el);
            //self.$el.find('#turnOff').html(App.view.device_winixTitanSettingTurnOff.render(data).$el);
            self.$el.find('#filterUsed').html(App.view.device_winixTitanSettingFilterUsed.render(data).$el);

            self.$el.find('#infomation').html(App.view.device_winixTitanSettingInfomation.render(data).$el);
        } else {
            //self.$el.find('#alarm').html(App.view.device_winixTitanSettingAlarm.render(data).$el);
            self.$el.find('#infomation').html(App.view.device_winixTitanSettingInfomation.render(data).$el);
        }
        return self;
    }
});