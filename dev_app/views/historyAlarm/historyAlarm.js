directory.historyAlarm = Backbone.View.extend({
    schoolCardSlider: null,
    initialize: function () {

        this.render();
    },
    render: function () {
        var self = this;

        // 헤더 바인딩
        App.view.subHeader.render();

        $('.wrap_contents').scrollTop(0);


        //api
        App.model.deviceOpr.fetch({
            method: "GET",
            headers: {
                "Authorization": App.vars.token,
                "Content-Type": "application/json",
                "company": "school"
            },
            data: {
                "count":50 ,
                "rtnDvcId": App.vars.rtnDvcId,
                "schCd": App.vars.schCd,

            },
            //data: JSON.stringify(App.vars.oDeviceId),
            success: function (model, response) {
                console.log('@ App.model.deviceOpr');
                console.log(response);

                var num = response.resultList.length -1
                App.vars.serdSer = response.resultList[num].sendSer;


                self.oDeviceOpr = response;

                // 템플릿팅
                if (response.resultList.length <= 0) {
                    self.$el.html(templete["historyAlarm/historyAlarmNone"]());
                } else {
                    if(App.vars.rtnDvcId === ''){
                        self.$el.html(templete["historyAlarm/historyAlarm"](self.oDeviceOpr));
                    }else{
                        self.$el.html(templete["historyAlarm/deviceHistoryAlarm"](self.oDeviceOpr));
                    }

                }

                // 컨텐츠 바인딩
                $('.wrap_contents').html(self.$el).removeClass('wrap_contents_gray')
                    .addClass('wrap_contents_gray01');

                var sendMd = [];
                response.resultList.forEach(function (a, i){
                    $('.area_history_box').eq(0).addClass('_first');
                    $('.day').hide();
                    $('.day').eq(0).show();

                    if(i<=response.resultList.length-2 ){
                        if(response.resultList[i].sendMd != response.resultList[i+1].sendMd) {
                            sendMd.push(i);
                        }
                    }
                });

                sendMd.forEach(function (a, i){
                    $('.day').eq(sendMd[i]+1).show();

                });

                App.util.hideLoading();

                // $(document).scroll(function() {
                //     var maxHeight = $(document).height();
                //     var currentScroll = $(window).scrollTop() + $(window).height();
                //
                //     if (maxHeight <= currentScroll + 100) {
                //
                //         self.scrollRender(sendSer)
                //
                //     }
                // })

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

    },

    scrollRender: function (sendSer) {
        App.util.showLoading();
        App.model.deviceOpr.fetch({
            method: "GET",
            headers: {
                "Authorization": App.vars.token,
                "Content-Type": "application/json",
                "company": "school"
            },
            data: {
                "count":50 ,
                "rtnDvcId": App.vars.rtnDvcId,
                "schCd": App.vars.schCd,
                "sendSer":sendSer,
                "sendFlag":"D"

            },
            success: function (model, response) {
                App.util.hideLoading();
                console.log('@ App.model.deviceOpr2');
                console.log(response);

                self.oDeviceOpr2 = response;

                $('.timeline').append(templete["historyAlarm/historyAlarmContents"](self.oDeviceOpr2))


                $('.wrap_contents').html(self.$el).removeClass('wrap_contents_gray')
                    .addClass('wrap_contents_gray01');

                var sendMd = [];
                response.resultList.forEach(function (a, i){
                    $('.area_history_box').eq(0).addClass('_first');
                    $('.day').hide();
                    $('.day').eq(0).show();

                    if(i<=response.resultList.length-2 ){
                        if(response.resultList[i].sendMd != response.resultList[i+1].sendMd) {
                            sendMd.push(i);
                        }
                    }
                });

                sendMd.forEach(function (a, i){
                    $('.day').eq(sendMd[i]+1).show();

                });

                App.util.hideLoading();

            },
            complete: function () {
                App.util.hideLoading();
            },
            error: function (e, response) {
                App.util.openNetworkErrorPopup();

            }
        });

    }





});