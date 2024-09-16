import axios from "axios";
import createHeader from "../createHeader.js";
import HirobaError from "../hirobaError.js";
import checkLogin from "../parse/checkLogin.js";

export default async function requestCompeDetail(token: string | null, compeId: string) {
  let response;
  try {
    response = await axios({
      method: "get",
      headers: token ? createHeader("_token_v2=" + token) : createHeader(),
      url: `https://donderhiroba.jp/compe_detail.php?compeid=${compeId}`,
    });
  } catch (err: any) {
    console.warn(err.message);
    throw new HirobaError("CANNOT_CONNECT");
  }
  if (!checkLogin(response)) throw new HirobaError("NOT_LOGINED");

  return response.data as string;
}
