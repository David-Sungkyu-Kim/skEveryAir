directory.airPurifierSamsungPurifier = Backbone.View.extend({
    initialize: function () {
        //Samsung
        App.view.device_samsungPurifierSettingAlarm = new directory.device_samsungPurifierSettingAlarm();
        App.view.device_samsungPurifierSettingFilterUsed = new directory.device_samsungPurifierSettingFilterUsed();
        App.view.device_samsungPurifierSettingInfomation = new directory.device_samsungPurifierSettingInfomation();
        App.view.device_samsungPurifierSettingMode= new directory.device_samsungPurifierSettingMode();
        App.view.device_samsungPurifierSettingPower= new directory.device_samsungPurifierSettingPower();
        App.view.device_samsungPurifierSettingTurnOff = new directory.device_samsungPurifierSettingTurnOff();
        App.view.device_samsungPurifierSettingVolume = new directory.device_samsungPurifierSettingVolume();
        this.render();
    },
    render: function (data) {
        var self = this;
        // 템플릿팅
        self.$el.html(templete["device_samsungPurifier/device"](data));

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

                self.$el.find('#alarm').html(App.view.device_samsungPurifierSettingAlarm.render(data).$el);

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
            self.$el.find('#power').html(App.view.device_samsungPurifierSettingPower.render(data).$el);
            self.$el.find('#mode').html(App.view.device_samsungPurifierSettingMode.render(data).$el);
            self.$el.find('#volume').html(App.view.device_samsungPurifierSettingVolume.render(data).$el);
            //self.$el.find('#turnOff').html(App.view.device_samsungPurifierSettingTurnOff.render(data).$el);
            self.$el.find('#filterUsed').html(App.view.device_samsungPurifierSettingFilterUsed.render(data).$el);

            self.$el.find('#infomation').html(App.view.device_samsungPurifierSettingInfomation.render(data).$el);
        } else {
            self.$el.find('#alarm').html(App.view.device_samsungPurifierSettingAlarm.render(data).$el);
            self.$el.find('#infomation').html(App.view.device_samsungPurifierSettingInfomation.render(data).$el);
        }
        return self;
    }
});