package com.bruce.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class GetJson {
	/**
	 * 发起http请求并获取结果
	 * 
	 * @param requestUrl
	 *            请求地址
	 */
	public static String getXpath(String requestUrl) {
		String res = "";
		StringBuffer buffer = new StringBuffer();
		try {
			URL url = new URL(requestUrl);
			HttpURLConnection urlCon = (HttpURLConnection) url.openConnection();
			if (200 == urlCon.getResponseCode()) {
				InputStream is = urlCon.getInputStream();
				InputStreamReader isr = new InputStreamReader(is, "utf-8");
				BufferedReader br = new BufferedReader(isr);

				String str = null;
				while ((str = br.readLine()) != null) {
					buffer.append(str);
				}
				br.close();
				isr.close();
				is.close();
				res = buffer.toString();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return res;
	}

	// 测试
	public static void main(String args[]) {
		String res = getXpath("https://api.douban.com/v2/movie/in_theaters");
		System.out.println(res);
	}
}
