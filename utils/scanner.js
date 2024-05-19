/**
 * 监听扫描事件
 * 参考：https://ask.dcloud.net.cn/article/id-36468
 * https://www.jianshu.com/p/8d35fca3ae76
 */

let main;
let filter;
let receiver;
let tag = false;

/**
 * 开始广播监听
 */
const start = () => {
	 /* #ifdef APP-PLUS */
	main.registerReceiver(receiver, filter);
	 /* #endif */
}
/**
 * 停止广播监听
 */
const stop = () => {
	/* #ifdef APP-PLUS */
	main.unregisterReceiver(receiver);
	/* #endif */
}


/**
 *
 * 定义广播
 * that：传this；
 */
const init = (onReceive) => {
	/* #ifdef APP-PLUS */
	//获取activity
	main = plus.android.runtimeMainActivity();
	const IntentFilter = plus.android.importClass('android.content.IntentFilter');
	filter = new IntentFilter();
	
	const scanManager = plus.android.importClass('android.device.ScanManager');
	
	// 扫描设置的广播动作
	filter.addAction("android.intent.ACTION_DECODE_DATA");
	receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
		onReceive: function(context, intent) {
			plus.android.importClass(intent);
			// 扫描设置的广播字符数据标签
			// const code = intent.getStringExtra("barcode_string");
			const code = intent.getStringExtra(scanManager.BARCODE_STRING_TAG);
			
			//条码长度  
			// var barcodeLength = intent.getIntExtra("length", 0)
			var barcodeLength = intent.getIntExtra(scanManager.BARCODE_LENGTH_TAG, 0)
			// 条码类型
			// var barcodeType = intent.getByteExtra("barcodeType", (0 | 0))
			var barcodeType = intent.getByteExtra(scanManager.BARCODE_TYPE_TAG, (0 | 0))

			if (tag) return;
			tag = true;
			setTimeout(function() {
				tag = false;
			}, 150);
			//到这里扫描成功了，可以调用自己的业务逻辑，code就是扫描的结果    return出code进行业务处理
			onReceive && onReceive(code, barcodeType, barcodeLength);
		}
	});

	function byteToString(arr) {
		if (typeof arr === 'string') {
			return arr;
		}
		var str = '',
			_arr = arr;
		for (var i = 0; i < _arr.length; i++) {
			var one = _arr[i].toString(2),
				v = one.match(/^1+?(?=0)/);
			if (v && one.length == 8) {
				var bytesLength = v[0].length;
				var store = _arr[i].toString(2).slice(7 - bytesLength);
				for (var st = 1; st < bytesLength; st++) {
					store += _arr[st + i].toString(2).slice(2);
				}
				str += String.fromCharCode(parseInt(store, 2));
				i += bytesLength - 1;
			} else {
				str += String.fromCharCode(_arr[i]);
			}
		}
		return str;
	}
	 /* #endif */

}

export const broadcastScan = {
	init,
	start,
	stop,
};



// page = this;

// this.title = "开始监听！";
// //获取activity
// let main = plus.android.runtimeMainActivity();  
// //上下文
// let context = plus.android.importClass('android.content.Context'); 
// let receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
// 	onReceive: doReceive
// });
// let IntentFilter = plus.android.importClass('android.content.IntentFilter');
// let Intent = plus.android.importClass('android.content.Intent');
// let filter = new IntentFilter();

// //针对优博讯安卓PDA-i6310添加监听，其它优博讯的型号应该一样或类似  
// filter.addAction("android.intent.ACTION_DECODE_DATA"); //监听扫描  

// main.registerReceiver(receiver, filter); //注册监听    

// function doReceive(context, intent) {

// 	//通过intent实例引入intent类，方便以后的‘.’操作    
// 	plus.android.importClass(intent);

// 	//条码内容  
// 	let barcodeBytes = intent.getByteArrayExtra("barcode");
// 	let barcode = byteToString(barcodeBytes);

// 	//条码长度  
// 	let barcodeLength = intent.getIntExtra("length", 0);
// 	//let myArray = new ArrayBuffer(0);  
// 	//条码类型  
// 	let barcodeTypeBytes = intent.getByteExtra("barcodeType", (0 | 0));
// 	let barcodeType = byteToString(barcodeTypeBytes);

// 	// uni.showModal({  
// 	//  content: '条码:' + barcode + '\r\n长度:' + barcodeLength + '\r\n类型:' + barcodeType,  
// 	//  showCancel: false  
// 	// });  
// 	page.title = barcode;
// 	//console.log(barcode);    
// 	//main.unregisterReceiver(receiver);//取消监听    
// }

// function byteToString(arr) {
// 	if (typeof arr === 'string') {
// 		return arr;
// 	}
// 	let str = '',
// 		_arr = arr;
// 	for (let i = 0; i < _arr.length; i++) {
// 		let one = _arr[i].toString(2),
// 			v = one.match(/^1+?(?=0)/);
// 		if (v && one.length == 8) {
// 			let bytesLength = v[0].length;
// 			let store = _arr[i].toString(2).slice(7 - bytesLength);
// 			for (let st = 1; st < bytesLength; st++) {
// 				store += _arr[st + i].toString(2).slice(2);
// 			}
// 			str += String.fromCharCode(parseInt(store, 2));
// 			i += bytesLength - 1;
// 		} else {
// 			str += String.fromCharCode(_arr[i]);
// 		}
// 	}
// 	return str;
// }