export interface IallListProps {
  //  token: string,
  _id: string;
  title: string;
  description: string;
  image: string;
  status: number;
  data: string;
}

export interface listProps extends IallListProps {
  user: IallListProps;
}

export interface IcreateProps {
  token: string;
  message: string;
  status: number;
  title: string;
  description: string;
  image: string;
  user?: Record<string, any>;
}

export interface createProps extends IcreateProps {
  user: IcreateProps;
}

export interface IdeleteProps {
  id: string;
  token: string;
  message: string;
  status: number;
  title: string;
  description: string;
}

export interface deleteProps extends IdeleteProps {
  user: IdeleteProps;
  status: number;
  token: string;
}

export interface IupdateProps {
  id: string;
  token: string;
  message: string;
  status: number;
  title: string;
  image: string;
  description: string;
}
export interface updateProps extends IupdateProps {
  user: IupdateProps;
  status: number;
  token: string;
}

export interface IdetailsProps {
  id: string;
  token: string;
  message: string;
  status: number;
  title: string;
  description: string;
  image: string;
}
export interface detailsProps extends IdetailsProps {
  user: IdetailsProps;
  status: number;
  token: string;
}

export interface detailmodalProps {
  isOpen: boolean;
  onClose: () => void;
}
