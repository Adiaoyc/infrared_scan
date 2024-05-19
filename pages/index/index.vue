<template>
	<view class="content">

		<view class="title">调用相机扫描条码</view>
		<view class="input">
			<uni-easyinput suffixIcon="scan" v-model="orderNo" placeholder="请扫描条码"
				@iconClick="scanClick"></uni-easyinput>
		</view>


		<view class="title">uniapp优博讯PDA红外扫描示例</view>
		<view class="text-area">
			<uni-easyinput type="textarea" disabled autoHeight v-model="scanText"
				placeholder="点击红外扫描按钮识别到内容后会显示在这儿"></uni-easyinput>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		getCurrentInstance
	} from 'vue';
	import {
		onLoad,
		onUnload,
		onHide,
		onShow
	} from '@dcloudio/uni-app';

	let scanText = ref('');
	let orderNo = ref('');

	const {
		proxy,
		ctx
	} = getCurrentInstance();

	onLoad((res) => {
		proxy.$broadcastScan.init(getScancode);


	})
	onUnload(() => {
		proxy.$broadcastScan.stop();
	})

	onHide(() => {
		proxy.$broadcastScan.stop();
	})

	onShow(() => {
		proxy.$broadcastScan.start();
	})

	/**
	 * 相机扫描
	 */
	function scanClick() {
		uni.scanCode({
			success: function(res) {
				console.log('条码类型：' + res.scanType);
				console.log('条码内容：' + res.result);
				orderNo.value = res.result
			}
		});

	}

	/**
	 * PDA扫码回调方法
	 * @param {Object} code
	 * @param {Object} barcodeType
	 * @param {Object} barcodeLength
	 */
	function getScancode(code, barcodeType, barcodeLength) {
		code = code.trim()
		console.log(code)
		scanText.value = code

	}
</script>

<style lang="scss" scoped>
	.content {
		.title {
			margin-top: 20px;
			margin-bottom: 10px;
			font-size: 40rpx;
			font-weight: 600;
		}
	}
</style>