import axios from "axios";
import createHeader from "../createHeader";
import HirobaError from "../hirobaError";
import checkLogin from "../parse/checkLogin";

export default async function requestCompeData(token: string | null, compeId: string) {
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
