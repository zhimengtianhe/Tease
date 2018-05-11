import React, { Component } from 'react';

class Fetch extends Component {
	/*
	 *  get请求
	 *  url:请求地址
	 *  params:参数
	 *  callback:回调函数
	 * */
	async get(url, params, callback) {
		try {
			if(params) {
				let paramsArray = [];
				
				Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
				if(url.search(/\?/) === -1) {
					url += '?' + paramsArray.join('&')
				} else {
					url += '&' + paramsArray.join('&')
				}
			}
			let response = await fetch(url, {
				method: 'GET',
			})
			let responseJson = await response.json();
			return callback(responseJson)

		} catch(error) {
			console.error(error);
		}
	}
	/*
	 *  post请求
	 *  url:请求地址
	 *  params:参数
	 *  callback:回调函数
	 * */
	async post(url, params, headers, callback) {
		try {
			let response=await fetch(url, {
					method: 'POST',
					headers: {
						'token': headers
					},
					body: params,
				})
				
				let responseJson = await response.json();
				return callback(responseJson)
				
		}catch(error) {
			console.error(error);
		}
	}
}

export default Fetch