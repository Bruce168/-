package com.bruce.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bruce.utils.GetJson;

public class JsonFromDouBanServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -424985339055079157L;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String url = "https://api.douban.com/v2/movie/";
		String param = request.getParameter("param");

		System.out.println("param:" + param);

		if (param != null && !param.equals("")) {

			if (param.indexOf("?") == -1) {
				url += param;
			} else {
				String uri = param.substring(0, param.indexOf("?") + 1);
				url += uri;

				String[] params = param.substring(uri.length()).split("_");
				for (int i = 0; i < params.length; i++) {
					url += params[i];
					if (i < params.length - 1) {
						url += "&";
					}
				}
			}

		}

		// System.out.println(url);

		String str = GetJson.getXpath(url);

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println(str);
		out.flush();
		out.close();

		// System.out.println(str);
	}

}
