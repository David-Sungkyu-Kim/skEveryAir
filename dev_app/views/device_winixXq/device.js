directory.airPurifierWinixXq = Backbone.View.extend({
    initialize: function () {
        //WinixXQ
        App.view.device_winixXqSettingAlarm= new directory.device_winixXqSettingAlarm();
        App.view.device_winixXqSettingFilterUsed = new directory.device_winixXqSettingFilterUsed();
        App.view.device_winixXqSettingChildLock = new directory.device_winixXqSettingChildLock();
        App.view.device_winixXqSettingMode = new directory.device_winixXqSettingMode();
        App.view.device_winixXqSettingPlasmaWave = new directory.device_winixXqSettingPlasmaWave();
        App.view.device_winixXqSettingPower = new directory.device_winixXqSettingPower();
        App.view.device_winixXqSettingTurnOff = new directory.device_winixXqSettingTurnOff();
        App.view.device_winixXqSettingVolume = new directory.device_winixXqSettingVolume();
        App.view.device_winixXqSettingPollutionLamp = new directory.device_winixXqSettingPollutionLamp();
        App.view.device_winixXqSettingUV= new directory.device_winixXqSettingUV();
        App.view.device_winixXqSettingInfomation = new directory.device_winixXqSettingInfomation();
        this.render();
    },
    render: function (data) {
        var self = this;
        // 템플릿팅
        self.$el.html(templete["device_winixXq/device"](data));


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
                self.$el.find('#alarm').html(App.view.device_winixXqSettingAlarm.render(data).$el);

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
            self.$el.find('#power').html(App.view.device_winixXqSettingPower.render(data).$el);
            self.$el.find('#mode').html(App.view.device_winixXqSettingMode.render(data).$el);
            self.$el.find('#volume').html(App.view.device_winixXqSettingVolume.render(data).$el);
            self.$el.find('#plasmaWave').html(App.view.device_winixXqSettingPlasmaWave.render(data).$el);
            //self.$el.find('#turnOff').html(App.view.device_winixXqSettingTurnOff.render(data).$el);
            self.$el.find('#filterUsed').html(App.view.device_winixXqSettingFilterUsed.render(data).$el);

            self.$el.find('#childlock').html(App.view.device_winixXqSettingChildLock.render(data).$el);
            self.$el.find('#pollutionlamp').html(App.view.device_winixXqSettingPollutionLamp.render(data).$el);
            self.$el.find('#uv').html(App.view.device_winixXqSettingUV.render(data).$el);
            self.$el.find('#infomation').html(App.view.device_winixXqSettingInfomation.render(data).$el);
        } else {
            //self.$el.find('#alarm').html(App.view.device_winixXqSettingAlarm.render(data).$el);
            self.$el.find('#infomation').html(App.view.device_winixXqSettingInfomation.render(data).$el);
        }


        return self;
    }
});