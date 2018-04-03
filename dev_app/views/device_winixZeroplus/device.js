directory.airPurifierWinixZeroplus = Backbone.View.extend({
    initialize: function () {
        //위닉스 제로플러스
        App.view.device_winixZeroplusSettingAlarm = new directory.device_winixZeroplusSettingAlarm();
        App.view.device_winixZeroplusSettingFilterUsed = new directory.device_winixZeroplusSettingFilterUsed();
        App.view.device_winixZeroplusSettingInfomation = new directory.device_winixZeroplusSettingInfomation();
        App.view.device_winixZeroplusSettingMode = new directory.device_winixZeroplusSettingMode();
        App.view.device_winixZeroplusSettingPlasmaWave = new directory.device_winixZeroplusSettingPlasmaWave();
        App.view.device_winixZeroplusSettingPower = new directory.device_winixZeroplusSettingPower();
        App.view.device_winixZeroplusSettingTurnOff = new directory.device_winixZeroplusSettingTurnOff();
        App.view.device_winixZeroplusSettingVolume = new directory.device_winixZeroplusSettingVolume();
        App.view.device_winixZeroplusSettingChildLock = new directory.device_winixZeroplusSettingChildLock();
        this.render();
    },
    render: function (data) {
        var self = this;
        // 템플릿팅
        self.$el.html(templete["device_winixZeroplus/device"](data));


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
                self.$el.find('#alarm').html(App.view.device_winixZeroplusSettingAlarm.render(data).$el);

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

            self.$el.find('#power').html(App.view.device_winixZeroplusSettingPower.render(data).$el);
            self.$el.find('#mode').html(App.view.device_winixZeroplusSettingMode.render(data).$el);
            self.$el.find('#volume').html(App.view.device_winixZeroplusSettingVolume.render(data).$el);
            self.$el.find('#plasmaWave').html(App.view.device_winixZeroplusSettingPlasmaWave.render(data).$el);
            //self.$el.find('#turnOff').html(App.view.device_winixZeroplusSettingTurnOff.render(data).$el);
            self.$el.find('#filterUsed').html(App.view.device_winixZeroplusSettingFilterUsed.render(data).$el);

            self.$el.find('#infomation').html(App.view.device_winixZeroplusSettingInfomation.render(data).$el);
            self.$el.find('#childlock').html(App.view.device_winixZeroplusSettingChildLock.render(data).$el);


        } else {
            //self.$el.find('#alarm').html(App.view.device_winixZeroplusSettingAlarm.render(data).$el);
            self.$el.find('#infomation').html(App.view.device_winixZeroplusSettingInfomation.render(data).$el);

        }
        return self;
    }


});