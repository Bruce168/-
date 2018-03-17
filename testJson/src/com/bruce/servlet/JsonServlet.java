package com.bruce.servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;

public class JsonServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3660429250473405631L;

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String fileName = request.getParameter("fName");

		String data = request.getSession().getServletContext()
				.getRealPath("js/" + fileName + ".json").toString();
		File file = new File(data);
		if (!file.exists()) {
			file.createNewFile();
		}
		String str = FileUtils.readFileToString(file, "UTF-8");

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println(str);
		out.flush();
		out.close();
	}

}
