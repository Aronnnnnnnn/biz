import axios from "../axios";

export type User = {
  puSeq: number;
  name: string;
  phone: string;
  roleName: string; // '관리자' // TODO
  status: string; // 정상
  activatedAt: string;
};

export type Menu = {
  pmSeq: number;
  priority: number;
  name: string;
  uri: string | null;
  children?: Menu[];
};

export type Partner = {
  pSeq: number;
  name: string;
  createdAt: string;
  address: string;
  paymentType: number;
  partnerCard: {
    name: string;
    number: string;
  } | null;
};

export type PartnerSignInInfo = Partner & {
  lastSignInAt: string;
};

export enum PartnerCenterPermission {
  PROFILE_VIEW = "PROFILE_VIEW",
  PROFILE_UPDATE = "PROFILE_UPDATE",
  TICKET_REQUEST_LIST = "TICKET_REQUEST_LIST",
  TICKET_REQUEST_VIEW = "TICKET_REQUEST_VIEW",
  TICKET_REQUEST_CREATE = "TICKET_REQUEST_CREATE",
  TICKET_LIST = "TICKET_LIST",
  TICKET_UPDATE = "TICKET_UPDATE",
  PAYMENT_LIST = "PAYMENT_LIST",
  PAYMENT_VIEW = "PAYMENT_VIEW",
  PARTNER_VIEW = "PARTNER_VIEW",
  MEMBER_LIST = "MEMBER_LIST",
  CARD_CREATE = "CARD_CREATE",
  TICKET_CONTRACT_LIST = "TICKET_CONTRACT_LIST",
}

const signIn = async (payload: {
  email: string;
  password: string;
  pSeq?: number;
}) => {
  const { data } = await axios.post<
    | { accessToken: string; refreshToken: string }
    | { partner: PartnerSignInInfo[] }
  >("/auth/login", payload);
  return data;
};

const getMenus = async () => {
  const { data } = await axios.get<{
    menus: Menu[];
    permissions: PartnerCenterPermission[];
    profile: User;
    partners: Partner[];
  }>("/auth/menu");
  return data;
};

const refreshAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { data } = await axios.post<{
    accessToken: string;
    refreshToken: string;
  }>("/auth/refresh", { refreshToken });
  return data;
};

export default {
  refreshAccessToken,
  signIn,
  getMenus,
};
