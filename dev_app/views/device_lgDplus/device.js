directory.airPurifierLgDplus = Backbone.View.extend({
    initialize: function () {
        //LgD
        App.view.device_lgDplusSettingAlarm= new directory.device_lgDplusSettingAlarm();
        App.view.device_lgDplusSettingInfomation = new directory.device_lgDplusSettingInfomation();
        App.view.device_lgDplusSettingMode = new directory.device_lgDplusSettingMode();
        App.view.device_lgDplusSettingPower = new directory.device_lgDplusSettingPower();
        App.view.device_lgDplusSettingPuritySignLamp = new directory.device_lgDplusSettingPuritySignLamp();
        App.view.device_lgDplusSettingRemoveVirus = new directory.device_lgDplusSettingRemoveVirus();
        App.view.device_lgDplusSettingTurnOf = new directory.device_lgDplusSettingTurnOff();
        App.view.device_lgDplusSettingVolume = new directory.device_lgDplusSettingVolume();
        this.render();
    },
    render: function (data) {
        var self = this;
        // 템플릿팅
        self.$el.html(templete["device_lgDplus/device"](data));

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
                self.$el.find('#alarm').html(App.view.device_lgDplusSettingAlarm.render(data).$el);

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
            self.$el.find('#power').html(App.view.device_lgDplusSettingPower.render(data).$el);
            self.$el.find('#mode').html(App.view.device_lgDplusSettingMode.render(data).$el);
            self.$el.find('#volume').html(App.view.device_lgDplusSettingVolume.render(data).$el);
            self.$el.find('#purifysignlamp').html(App.view.device_lgDplusSettingPuritySignLamp.render(data).$el);
            //self.$el.find('#turnOff').html(App.view.device_lgDplusSettingTurnOf.render(data).$el);
            self.$el.find('#removevirus').html(App.view.device_lgDplusSettingRemoveVirus.render(data).$el);

            self.$el.find('#infomation').html(App.view.device_lgDplusSettingInfomation.render(data).$el);
        } else {
           //self.$el.find('#alarm').html(App.view.device_lgDplusSettingAlarm.render(data).$el);
            self.$el.find('#infomation').html(App.view.device_lgDplusSettingInfomation.render(data).$el);
        }
        return self;
    }
});