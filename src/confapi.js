import axios from "axios";
import exports, { Module } from "webpack";

const api = axios.create({
	baseURL: "http://192.168.26.192:3303/api",
});
exports =api