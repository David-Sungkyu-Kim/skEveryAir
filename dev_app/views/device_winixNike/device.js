directory.airPurifierWinixNike = Backbone.View.extend({
    initialize: function () {
        //WinixNike
        App.view.device_winixNikeSettingAlarm = new directory.device_winixNikeSettingAlarm();
        App.view.device_winixNikeSettingFilterUsed = new directory.device_winixNikeSettingFilterUsed();
        App.view.device_winixNikeSettingInfomation = new directory.device_winixNikeSettingInfomation();
        App.view.device_winixNikeSettingMode = new directory.device_winixNikeSettingMode();
        App.view.device_winixNikeSettingPlasmaWave = new directory.device_winixNikeSettingPlasmaWave();
        App.view.device_winixNikeSettingPower = new directory.device_winixNikeSettingPower();
        App.view.device_winixNikeSettingTurnOff = new directory.device_winixNikeSettingTurnOff();
        App.view.device_winixNikeSettingVolume = new directory.device_winixNikeSettingVolume();
        this.render();
    },
    render: function (data) {
        var self = this;
        // 템플릿팅
        self.$el.html(templete["device_winixNike/device"](data));

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
                self.$el.find('#alarm').html(App.view.device_winixNikeSettingAlarm.render(data).$el);

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
            self.$el.find('#power').html(App.view.device_winixNikeSettingPower.render(data).$el);
            self.$el.find('#mode').html(App.view.device_winixNikeSettingMode.render(data).$el);
            self.$el.find('#volume').html(App.view.device_winixNikeSettingVolume.render(data).$el);
            self.$el.find('#plasmaWave').html(App.view.device_winixNikeSettingPlasmaWave.render(data).$el);
            //self.$el.find('#turnOff').html(App.view.device_winixNikeSettingTurnOff.render(data).$el);
            self.$el.find('#filterUsed').html(App.view.device_winixNikeSettingFilterUsed.render(data).$el);

            self.$el.find('#infomation').html(App.view.device_winixNikeSettingInfomation.render(data).$el);
        } else {
            //self.$el.find('#alarm').html(App.view.device_winixNikeSettingAlarm.render(data).$el);
            self.$el.find('#infomation').html(App.view.device_winixNikeSettingInfomation.render(data).$el);
        }
        return self;
    }
});