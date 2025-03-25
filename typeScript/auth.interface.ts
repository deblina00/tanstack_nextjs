export interface IloginProps {
  email: string;
  password: string;
  token: string;
  message: string;
  status: number;
  data: object;
}
export interface IregisterProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_pic: string;
  token: string;
  message: string;
  status: number;
}
export interface loginProps extends IloginProps {
  user: IloginProps;
}

export interface registerProps extends IregisterProps {
  user: IregisterProps;
}

export interface IprofileProps {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_pic: string;
  token: string;
  message: string;
  status: number;
}

export interface profileProps extends IprofileProps {
  user: IprofileProps;
  status: number;
  token: string;
}

export interface profilemodalProps {
  isOpen: boolean;
  onClose: () => void;
}
