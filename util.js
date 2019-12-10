import $ from 'jquery';
import store from '../config/store/store';

let util = {};
util.install = function (Vue) {

    Vue.prototype.$platformChecker = objectName => {
        let judgeModel = store.state.platformCheckerModel[objectName] || {};
        console.log(objectName)
        console.log(store.state.platformCheckerModel[objectName])

        Object.keys(judgeModel).forEach(item => {
            if (judgeModel[item] instanceof Object) {
                // alert(item)
                let result = false;
                Object.keys(item).forEach(item2 => {
                    if (item2 === true) {
                        result = true;
                    }
                });
                judgeModel[item].show = result;
            }
        });
        if (objectName === 'personBasicInfo') {
            console.log(judgeModel)
        }
        return judgeModel;
    };

    Vue.prototype.$platformChecker2 = objectName => {
        let platformCode = store.state.currentPlatformId;
        let checkModel = store.state.platformCheckerModel;
        // alert(Object.values(store.state.platformCheckerModel).length)
        let layBack = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Object.values(store.state.platformCheckerModel).length !== 0) {
                    resolve();
                } else {
                    reject();
                }
            }, 5000)

        });
        let checkFinder = objectNameStringList => {
            if (objectNameStringList.length !== 1) {
                let newObjectNameStringList = objectNameStringList.filter((item, index) => index !== 0);
                console.log(newObjectNameStringList)
                checkFinder(newObjectNameStringList)
            } else {
                let target = checkModel[originObjectNameStringList[0]];
                console.log(target)
                originObjectNameStringList.forEach((item, index) => {
                    if (index !== 0) {
                        result = target[originObjectNameStringList[index]];
                    }
                })
            }
        };
        console.log(checkModel)
        let originObjectNameStringList = objectName.split('.');
        console.log(originObjectNameStringList)
        let result = true;
        layBack.then(success => {

            checkFinder(originObjectNameStringList)
        }).catch(err => {
            alert('errrr')

        })
        // alert(result)
        return result;

    };
    Vue.prototype.$getDictionaryData = name => {
        let result = [];
        let requestList = store.state.dictionaryDataSequence;
        let targetDictionary = store.state.dictionaryData[name];
        if (typeof targetDictionary !== 'undefined' && targetDictionary.data.length !== 0) {
            result = store.state.dictionaryData[name].data;
        } else {
            let getData = new Promise((resolve, reject) => {
                if (requestList.filter(item => item === name).length === 0) {
                    store.commit('pushDictionaryDataSequence', name)
                    resolve();
                } else {
                    reject('nonono');
                }
            });
            getData.then(() => {
                Vue.prototype.$http.get(Vue.prototype.$baseUrl_new + 'dictionary/dictionList', {
                    params: {
                        type: name
                    }
                }).then(response => {
                    response = response.data.data;
                    targetDictionary.pending = false;
                    if (response.length > 0) {
                        store.commit('updateDictionaryData', {
                            name: name,
                            data: response
                        });
                    } else {
                        this.$message.error(`${name}类字典数据为空`)
                    }
                }).catch(error => {
                    this.$message.error(`无${name}类字典数据`);
                    store.commit('splitDictionaryDataSequence', name)
                });
            }).catch(err => {
                // console.log(err)
            });
            result = store.state.dictionaryData[name].data;
        }
        return result;
    };
    Vue.prototype.$getDictionaryData_old = name => {
        let result = [];
        let targetDictionary = store.state.dictionaryData[name];
        if (typeof targetDictionary !== 'undefined' && targetDictionary.data.length !== 0) {
            result = store.state.dictionaryData[name].data;
        } else {
            if (targetDictionary.pending === false || typeof targetDictionary.pending === 'undefined') {
                targetDictionary.pending = true;
                Vue.prototype.$http.get(Vue.prototype.$baseUrl_new + 'dictionary/dictionList', {
                    params: {
                        type: name
                    }
                }).then(response => {
                    response = response.data.data;
                    targetDictionary.pending = false;
                    if (response.length > 0) {
                        store.commit('updateDictionaryData', {
                            name: name,
                            data: response
                        });
                    } else {
                        this.$message.error(`${name}类字典数据为空`)
                    }
                }).catch(error => {
                    this.$message.error(`无${name}类字典数据`)
                });
                result = store.state.dictionaryData[name].data;
            } else {
                result = [{
                    name: 'dsdsds'
                }];
            }
        }
        return result;
    };

    Vue.prototype.$generateUrlParams = data => {
        let result = '?';
        Object.keys(data).forEach((item, index) => {
            if (index < Object.keys(data).length - 1) {
                result += item + '=' + data[item] + '&';
            } else {
                result += item + '=' + data[item];
            }
        });
        return result;
    };

    Vue.prototype.$fireKeyEvent = (el, evtType, keyCode) => {
        let doc = el.ownerDocument,
            win = doc.defaultView || doc.parentWindow,
            evtObj;
        if (doc.createEvent) {
            if (win.KeyEvent) {
                evtObj = doc.createEvent('KeyEvents');
                evtObj.initKeyEvent(evtType, true, true, win, false, false, false, false, keyCode, 0);
            } else {
                evtObj = doc.createEvent('UIEvents');
                Object.defineProperty(evtObj, 'keyCode', {
                    get: function () {
                        return this.keyCodeVal;
                    }
                });
                Object.defineProperty(evtObj, 'which', {
                    get: function () {
                        return this.keyCodeVal;
                    }
                });
                evtObj.initUIEvent(evtType, true, true, win, 1);
                evtObj.keyCodeVal = keyCode;
                if (evtObj.keyCode !== keyCode) {
                    console.log('keyCode ' + evtObj.keyCode + ' 和 (' + evtObj.which + ') 不匹配');
                }
            }
            el.dispatchEvent(evtObj);
        } else if (doc.createEventObject) {
            evtObj = doc.createEventObject();
            evtObj.keyCode = keyCode;
            el.fireEvent('on' + evtType, evtObj);
        }
    };

    Vue.prototype.$fullScreen = () => {
        if (!sessionStorage.getItem('isFullScreen')) {

            let element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullScreen();
            }
            // sessionStorage.setItem('isFullScreen', 'true');
        }
    };

    Vue.prototype.$generateRandomList = count => {
        let orderedArr = [];
        let upsetArr = [];
        let loopTimes = count;
        let rand = 0;

        for (let i = 0; i < count; i++) {
            orderedArr.push(i);
        }
        console.log(orderedArr);
        //真随机算法
        for (let i = 0; i < loopTimes; i++) {
            rand = parseInt(Math.floor(Math.random() * count));
            for (let j = 0; j < i; j++) {
                if (upsetArr[j] === rand) {
                    upsetArr.splice(j, 1);
                    loopTimes++;
                }
            }
            upsetArr.push(rand);
        }
        return upsetArr;
    };


    Vue.prototype.$setMenuData = options => {
        let menuData = Object.assign({
            showMenu: true
        }, options);

        if (typeof window.localStorage.getItem('menuData') === 'undefined') {
            window.localStorage.setItem('menuData', menuData);
        }
    };

    Vue.prototype.$makeYearMonthDate = (timeStamp = Date.parse(new Date())) => {

        let result = Vue.prototype.$formatDate({
                date: new Date(timeStamp)
            }) + '年' +
            Vue.prototype.$formatDate({
                date: new Date(timeStamp),
                format: 'MM'
            }) + '月';
        return result;
    };
    Vue.prototype.$getDomain = (options) => {
        let domain = window.location.toString();
        let protocol;
        if (options === 'noProtocal') {
            domain = domain.replace(domain.substr(domain.indexOf('/#')), '');
            domain = domain.substr(domain.indexOf('://') + 3);
            return domain;
        } else {
            return domain.replace(domain.substr(domain.indexOf('/#')), '');
        }

    };
    Vue.prototype.$formatDate2 = fmt => {
        let o = {
            'M+': this.getMonth() + 1, //月份
            'd+': this.getDate(), //日
            'h+': this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
            'H+': this.getHours(), //小时
            'm+': this.getMinutes(), //分
            's+': this.getSeconds(), //秒
            'q+': Math.floor((this.getMonth() + 3) / 3), //季度
            'S': this.getMilliseconds() //毫秒
        };
        let week = {
            '0': '/u65e5',
            '1': '/u4e00',
            '2': '/u4e8c',
            '3': '/u4e09',
            '4': '/u56db',
            '5': '/u4e94',
            '6': '/u516d'
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[this.getDay() + '']);
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    };
    Vue.prototype.$formatDate = options => {
        options = Object.assign({
            date: 0,
            format: 'yyyy'
        }, options);
        let o = {
            'M+': options.date.getMonth() + 1, //月份
            'd+': options.date.getDate(), //日
            'h+': options.date.getHours() % 12 === 0 ? 12 : options.date.getHours() % 12, //小时
            'H+': options.date.getHours(), //小时
            'm+': options.date.getMinutes(), //分
            's+': options.date.getSeconds(), //秒
            'q+': Math.floor((options.date.getMonth() + 3) / 3), //季度
            'S': options.date.getMilliseconds() //毫秒
        };
        let week = {
            '0': '/u65e5',
            '1': '/u4e00',
            '2': '/u4e8c',
            '3': '/u4e09',
            '4': '/u56db',
            '5': '/u4e94',
            '6': '/u516d'
        };
        if (/(y+)/.test(options.format)) {
            options.format = options.format.replace(RegExp.$1, (options.date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(options.format)) {
            options.format = options.format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[options.date.getDay() + '']);
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(options.format)) {
                options.format = options.format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return options.format;
    };

    Vue.prototype.$findByKey = options => {
        options = Object.assign({
            array: [],
            key: '',
            value: ''
        }, options);
        let result;
        options.array.forEach(item => {
            if (item[options.key] === options.value) {
                result = item.value;
            }
        });
        return result;
    };

    Vue.prototype.$translateXAxisName = options => {
        options = Object.assign({
            list: [],
            keyName: 'key',
            dictionary: [{
                name: '',
                value: ''
            }]
        }, options);
        let result = [];
        options.list.forEach(item => {
            let value = Vue.prototype.$findByKey({
                array: options.dictionary,
                key: options.keyName,
                value: item
            });
            if (typeof value !== 'undefined') {
                result.push(value);
            }
        });
        return result;
    };

    Vue.prototype.$autoHeight = (options) => {
        options = $.extend({
            reference: '',
            target: '',
            content: 'body',
            offset: 0,
            scale: 1,
            minHeight: 0,
            returnValue: false
        }, options);
        let windowHeight = $(window).height();
        let targetHeight = 0;
        let referenceHeight = $(options.reference).height();
        let contentHeight = $(options.content).height();
        let pageHeight = document.body.scrollHeight;
        let offset = Number(options.offset);
        if (referenceHeight < options.minHeight || windowHeight < options.minHeight) {
            targetHeight = options.minHeight * options.scale;

        } else if (referenceHeight > windowHeight) {
            targetHeight = referenceHeight * options.scale + offset;
        } else if (contentHeight > windowHeight) {
            targetHeight = contentHeight * options.scale + offset;
        } else {
            targetHeight = windowHeight * options.scale + offset;

            // $(window).resize(function () {
            //     pageHeight = document.body.scrollHeight;
            //     targetHeight = windowHeight * options.scale + offset;
            // });
        }
        // window.onresize = () => {
        //     targetHeight = document.body.scrollHeight * options.scale + offset;
        //     // targetHeight = windowHeight * options.scale + offset;
        //     $(options.target).height(targetHeight);
        //     if (options.returnValue) {
        //         console.log(targetHeight)
        //         return targetHeight;
        //     }
        // };
        if (options.returnValue) {
            // console.log(targetHeight)
            return targetHeight;
        } else {
            $(options.target).height(targetHeight);
        }
    };

    Vue.prototype.$quickSort = (arr) => {
        let that = this;
        //如果数组<=1,则直接返回
        if (arr.length <= 1) {
            return arr;
        }
        let pivotIndex = Math.floor(arr.length / 2);
        //找基准，并把基准从原数组删除
        let pivot = arr.splice(pivotIndex, 1)[0];
        //定义左右数组
        let left = [];
        let right = [];

        //比基准小的放在left，比基准大的放在right
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] <= pivot) {
                left.push(arr[i]);
            }
            else {
                right.push(arr[i]);
            }
        }
        //递归
        return Vue.prototype.$quickSort(left).concat([pivot], Vue.prototype.$quickSort(right));
    };

    Vue.prototype.$colorRgb = function (hex) {
        let sColor = hex.toLowerCase();
        //十六进制颜色值的正则表达式
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        // 如果是16进制颜色
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = '#';
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            let sColorChange = [];
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
            }
            return 'RGB(' + sColorChange.join(',') + ')';
        }
        return sColor;
    };

    Vue.prototype.$popup = (options) => {
        options = $.extend({
            container: '',
            closebtn: '',
            maskopacity: 0,
            noborder: false,
            align: false,
            widthoffset: 17,
            callback: function () {
            }
        }, options);
        let that = this,
            containerEl = $(options.container),
            thisParent = containerEl.parent(),
            contentWidth = 0,
            popupContainerEl = $('.commonPopupContainer'),
            popupWrapperEl = $('.commonPopupWrapper');
        let tools = {
            getContainerWidth: function () {
                popupContainerEl.show();
                if (options.align && Vue.prototype.$align) {
                    setTimeout(function () {
                        Vue.prototype.$align({
                            target: '.commonPopupWrapper'
                        });
                    });
                }
                if (contentWidth === 0) {
                    contentWidth = containerEl.width();
                    this.getContainerWidth();
                } else {
                    popupContainerEl.hide();
                }
            }
        };
        // popupWrapperEl = $('<div></div>').addClass('commonPopupWrapper').html('').append(containerEl),
        // popupContainerEl = $('<div></div>').addClass('commonPopupContainer')
        // $('.commonPopupContainer').detach();
        // $('body').append(popupContainerEl.append(popupWrapperEl));
        tools.getContainerWidth();
        popupWrapperEl.css({
            width: contentWidth,
            border: '10px solid rgba(153,153,153,0.5)',
            'border-radius': 10,
            transition: 'all 0.3s'
        });
        popupContainerEl.css({
            display: 'block',
            position: 'fixed',
            top: 0,
            left: 0,
            'z-index': 99999,
            width: $(window).width(),
            height: $(window).height(),
            background: 'rgba(0,0,0,' + options.maskopacity + ')'
        });
        popupContainerEl.resize(function () {
            popupContainerEl.css({
                width: $(window).width(),
                height: $(window).height(),
            });
        });
        containerEl.css({
            display: 'block'
        });
        popupWrapperEl.css({
            display: 'block',
            opacity: 1
        });
        if (popupWrapperEl.height() > $(window).height() - 20) {
            popupWrapperEl.css({
                width: (containerEl.outerWidth() + options.widthoffset),
                height: ($(window).height() - 100),
                overflow: 'auto'
            });
        }

        if (options.closebtn != '') {
            $(options.closebtn).each(function () {
                $(this).on('click', function () {
                    // $('body').append($(".commonPopupContainer"));
                    $('.commonPopupContainer').hide();
                });
            });
        }
        options.callback();
    };

    Vue.prototype.$align = (options) => {
        options = $.extend({
            position: 'both',
            target: '',
            container: '',
            positive: false,
            isImage: false,
            offsetX: 0,
            offsetY: 0,
            ignoreY: 0,
            ignoreX: 0
        }, options);

        let that = $(options.target),
            imgSrc = that.attr('src'),
            reload = false,
            container = $(options.container),
            thisWidth = 0,
            thisHeight = 0,
            containerWidth = 0,
            containerHeight = 0,
            timer,
            imageObj = new Image(),
            offsetX = Number(options.offsetX),
            offsetY = Number(options.offsetY),
            ignoreX = Number(options.ignoreX),
            ignoreY = Number(options.ignoreY),
            ignoredElX = '',
            ignoredElY = '',
            windowWidth = $(window).width(),
            windowHeight = $(window).height();
        //_this.attr('src', imgSrc + '?' + Date.parse(new Date()))
        let tools = {
            calculateIgnore: function () {
                if (typeof options.ignoreY === 'string' || typeof options.ignoreX === 'string') {
                    let ignoreArrX = options.ignoreX.split(','),
                        ignoreArrY = options.ignoreY.split(',');
                    for (let i = 0; i < ignoreArrX.length; i++) {
                        ignoreX += $(ignoreArrX[i]).width();
                    }
                    for (let i = 0; i < ignoreArrY.length; i++) {
                        ignoreY += $(ignoreArrY[i]).height();
                    }
                    ignoredElX = $(ignoreArrX.join(','));
                    ignoredElY = $(ignoreArrY.join(','));
                    console.log(ignoreY);
                } else {
                    ignoreX = options.ignoreX;
                    ignoreY = options.ignoreY;
                }
            }
        };
        initAligning();
        $(window).resize(function () {
            initAligning();
        });

        function initAligning() {
            //当居中元素是img标签时，特殊处理！
            if (that.is('img')) {
                //递归判断需要居中的图片是否加载完成，如果没有就重载
                let checkImageLoaded = function () {
                    that.each(function (index) {
                        let $this = $(options.target);
                        let imageSrc = $this.attr('src');
                        containerWidth = container.eq(index).width();
                        containerHeight = container.eq(index).height();
                        if ($this.height() <= 0) {
                            imageObj.src = imageSrc;

                            // console.log($this.outerWidth())
                            checkPosition($this, imageObj.width, imageObj.height);
                        } else {
                            checkPosition($this);
                        }
                    });
                };
                checkImageLoaded();
                //缺省情况
            } else {

                //需要遍历每个居中对象，判断其每个container尺寸不同时，需分别处理
                //当设置了container时，以container尺寸大小居中
                if (options.container != '') {
                    for (let i = 0; i < that.length; i++) {
                        let $this = $(options.target);
                        containerHeight = container.eq(i).height();
                        containerWidth = container.eq(i).width();
                        console.log(containerHeight);

                        if ($this.is(':hidden')) {
                            return true;
                        } else {
                            checkPosition($this);
                        }
                    }
                    //当没有设置container时，以窗口尺寸大小居中
                } else {
                    containerWidth = $(window).width();
                    containerHeight = $(window).height();
                    that.each(function (index) {
                        let $this = $(options.target);
                        if ($this.is(':hidden')) {
                            return true;
                        } else {
                            checkPosition($this);
                        }
                    });
                }
            }
        }

        function checkPosition(_this, imageWidth, imageHeight) {
            let marginY, marginX;

            checkBrowser({
                ie: function () {
                    window.clearTimeout(timer);
                },
                other: function () {
                    clearTimeout(timer);
                }
            });

            if (arguments[1] != null && arguments[2] != null) {
                thisWidth = imageWidth;
                thisHeight = imageHeight;

            } else {
                thisWidth = _this.outerWidth();
                thisHeight = _this.outerHeight();
            }

            switch (options.position) {
                case 'both':
                    // console.log(thisHeight)
                    marginY = (containerHeight - thisHeight) / 2;
                    marginX = (containerWidth - thisWidth) / 2;
                    if (options.positive && marginY < 0 || marginX < 0) {
                        marginY = marginX = 0;
                    }
                    if (thisWidth <= containerWidth) {
                        if (options.offsetX !== 0) {
                            _this.css({
                                'margin': marginY + offsetY - ignoreY + 'px ' + (containerWidth - thisWidth) / 2 + offsetX - ignoreX + 'px'
                            });
                        } else {
                            _this.css({
                                'margin': marginY + offsetY - ignoreY + 'px auto'
                            });
                        }
                    } else {
                        let marginX = (containerWidth - thisWidth) / 2;
                        _this.css({
                            'margin': marginY + offsetY - ignoreY + 'px ' + (marginX + options.offsetX) + 'px'
                        });
                    }
                    break;
                case 'top':
                    aligning(function (thisWidth, thisHeight) {
                        _this.css({
                            'margin': '0 ' + ((containerWidth - thisWidth) / 2 + offsetX - ignoreX) + 'px'
                        });
                    });
                    break;
                case 'right':
                    if (thisHeight <= containerHeight) {
                        if (options.offsetY !== 0) {
                            _this.css({
                                'margin': marginY + offsetY - ignoreY + 'px 0'
                            });
                        } else {
                            _this.css({
                                'margin': marginY + offsetY - ignoreY + 'px 0'
                            });
                        }
                    } else {
                        marginX = (containerWidth - thisWidth) / 2;
                        _this.css({
                            'margin': (containerHeight - thisHeight) / 2 + offsetY - ignoreY + 'px 0'
                        });
                    }


                    // aligning(function(thisWidth, thisHeight) {
                    // 	_this.css({
                    // 		'margin': (windowHeight - thisHeight) / 2 + 'px 0 0 ' + (containerWidth - thisWidth) + 'px'
                    // 	});
                    // });
                    break;
                case 'bottom':
                    aligning(function (thisWidth, thisHeight) {
                        tools.calculateIgnore();
                        if (ignoreY <= windowHeight) {
                            _this.css({
                                'margin': (windowHeight - thisHeight + offsetY - ignoreY) + 'px auto 0'
                            });
                            console.log(ignoreY);
                            console.log(windowHeight);
                        }
                        ;
                    });
                    break;
                case 'left':
                    aligning(function (thisWidth, thisHeight) {
                        _this.css({
                            'margin': (windowHeight - thisHeight) / 2 + 'px 0 0 0'
                        });
                    });
                    break;
            }
        }

        function aligning(callback) {
            thisWidth = that.outerWidth();
            thisHeight = that.outerHeight();
            return callback(thisWidth, thisHeight);
        }

        function checkBrowser(callback) {
            callback = $.extend({
                ie: function () {
                },
                other: function () {
                }
            }, callback);
            if (navigator.appName.indexOf('Explorer') > -1) {
                console.log('IE');
                callback.ie();
            } else {
                // console.log('other')
                callback.other();
            }
        }

        //屏幕方向探测器
        function orientationSensor(callback) {
            let windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                orientation = '';
            callback = $.extend({
                portrait: function () {
                },
                landscape: function () {
                },
                orientationchange: function (windowWidth, windowHeight) {
                }
            }, callback);

            checkoritation();
            $(window).resize(function () {
                checkoritation();
            });

            function checkoritation() {
                callback.orientationchange();
                if (windowWidth < windowHeight) {
                    return callback.portrait();
                } else {
                    return callback.landscape();
                }
            }

            return (windowWidth < windowHeight) ? orientation = 'portrait' : orientation = 'landscape';
        }
    };
    Vue.prototype.$rawArray2ChartArray = function (data, firstProp = 'value', secondProp = 'name') {
        let datalist = [];
        for (let i in data) {
            if (data[i] !== 0) {
                datalist.push({[firstProp]: data[i], [secondProp]: i});
            }
        }
        datalist = datalist.reverse();
        return datalist;
    };


};
export default util;
