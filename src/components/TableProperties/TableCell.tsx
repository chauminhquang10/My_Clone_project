import React, { useEffect, useRef, useState } from 'react';
import { Typography } from 'antd';
import activeIcon from '@/assets/images/svg/icon/active-icon.svg';
import connectBoardIcon from '@/assets/images/svg/icon/connect-boards.svg';
import inactiveIcon from '@/assets/images/svg/icon/lock-icon.svg';
import style from './style.less';
import { ExclamationCircleFilled } from '@ant-design/icons';
import StatusTag from '../Common/StatusTag';
const { Text } = Typography;

//--------------- TextCell of Table ----------------

type TextCellProps = {
  children: React.ReactNode | string;
  onClick?: () => void;
  blue?: boolean;
  position?: 'left' | 'right' | 'center';
  width?: string;
};

export function TextCell({ children, onClick, blue, position, width }: TextCellProps) {
  return onClick ? (
    <div
      className={`${style['text-cell-click']} ${blue && style.blue}`}
      onClick={onClick}
      style={{
        textAlign: position ? position : 'center',
        width: width,
      }}
    >
      <Text
        ellipsis={{
          tooltip: children,
        }}
      >
        {children}
      </Text>
    </div>
  ) : (
    <div
      className={`${style['text-cell']} ${blue && style.blue}`}
      style={{
        textAlign: position ? position : 'center',
        width: width,
      }}
    >
      <Text
        ellipsis={{
          tooltip: children,
        }}
      >
        {children}
      </Text>
    </div>
  );
}

export enum UserCellStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  UNKNOWN = 'UNKNOWN',
}

type UserStatusCellProps = {
  status: UserCellStatus;
};

export function UserStatusCell({ status }: UserStatusCellProps) {
  switch (status) {
    case UserCellStatus.ACTIVE:
      return (
        <StatusTag
          title={UserCellStatus.ACTIVE}
          icon={<img src={activeIcon} alt="icon-active" />}
          type="success"
        />
      );
    case UserCellStatus.INACTIVE:
      return (
        <StatusTag
          title={UserCellStatus.INACTIVE}
          icon={<img src={inactiveIcon} alt="icon-inactive" />}
          type="error"
        />
      );
    default:
      return <StatusTag title={UserCellStatus.UNKNOWN} type="default" />;
  }
}

//--------------- MachineItem of ManageCell ----------------

type MachineItemProps = {
  machine: MachineType;
};

function MachineItem({ machine }: MachineItemProps) {
  return (
    <Text
      ellipsis={{
        tooltip: machine.text,
      }}
      className={style['machine-item']}
    >{`(${machine.text})`}</Text>
  );
}

//--------------- RestItem of ManageCell ----------------

type RestItemProps = {
  children: string;
  onClick: () => void;
};

function RestItem({ children, onClick }: RestItemProps) {
  return (
    <Text className={style['rest-item']} onClick={onClick}>
      {children}
    </Text>
  );
}

//--------------- DropdownItem of ManageCell ----------------

type DropdownItemProps = {
  machine: MachineType;
  onClick: () => void;
};

function DropdownItem({ machine, onClick }: DropdownItemProps) {
  return (
    <div className={style['dropdown-item']} onClick={onClick}>
      <Text
        ellipsis={{
          tooltip: machine.text,
        }}
        className={style.text}
      >
        {machine.text}
      </Text>
      <button className={style['detail-btn']}>
        <img className="detail-icon" src={connectBoardIcon} alt="" />
        <Text className={style['detail-text']}>Chi tiết</Text>
      </button>
    </div>
  );
}

//--------------- User Item Tag --------------------------------

type UserItemTagProps = {
  children: API.UserResponse;
};

export function UserItemTag({ children }: UserItemTagProps) {
  return (
    <div className={style['user-item-tag']}>
      <div className={style['img-box']}>
        {children.avatar ? (
          <img className={style.avatar} src={children.avatar} alt="" />
        ) : (
          <div className={style['no-image']}>
            <Text className={style['image-name']}>{children.name?.toString()[0]}</Text>
          </div>
        )}
      </div>
      <Text
        className={style['user-name']}
        ellipsis={{
          tooltip: children.name,
        }}
      >
        {children.name}
      </Text>
    </div>
  );
}

//--------------- User Dropdown Item --------------------------------

type UserDropdownItemProps = {
  user: API.UserResponse;
  onClick: () => void;
};

export function UserDropdownItem({ user, onClick }: UserDropdownItemProps) {
  return (
    <div
      className={style['user-item-dropdown']}
      onClick={() => {
        onClick();
      }}
    >
      {user.avatar ? (
        <div className={style['img-box']}>
          <img src={user.avatar} className={style.avatar} alt="" />
        </div>
      ) : (
        <div className={style['img-box']}>
          <div className={style['no-image']}>
            <Text className={style['image-name']}>{user.name?.toString()[0]}</Text>
          </div>
        </div>
      )}
      <Text
        ellipsis={{
          tooltip: user.name,
        }}
        className={style['user-name']}
      >
        {user.name}
      </Text>
    </div>
  );
}

//--------------- List UserCellGroup of Table --------------------------------

type UserCellGroupProps = {
  listUser: API.UserResponse[] | undefined;
};

export function UserCellGroup({ listUser }: UserCellGroupProps) {
  const amountUser = listUser?.length;
  const [active, setActive] = useState(false);
  const boxHoverRef = useRef<HTMLDivElement | null>(null);
  //------------ function see detail machine --------------------
  const openDetailMachine = () => {
    console.log('open');
  };
  //------------ function open dropdown --------------------
  const openDropdown = () => {
    console.log(boxHoverRef.current);
    setActive(true);
  };
  //------------ handle close dropdown ----------------
  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (e.target !== boxHoverRef.current && active) {
        setActive(false);
      }
    };
    addEventListener('click', closeDropdown);
    return () => {
      removeEventListener('click', closeDropdown);
    };
  }, [active]);
  const amountDisplay = 3;
  return amountUser ? (
    <div className={style['manage-cell']}>
      {amountUser <= amountDisplay
        ? listUser.map((item) => {
            return <UserItemTag key={item.id}>{item}</UserItemTag>;
          })
        : amountUser && (
            <>
              {listUser?.map((item, index) => {
                if (index < amountDisplay) return <UserItemTag key={item.id}>{item}</UserItemTag>;
                return null;
              })}
              <RestItem onClick={openDropdown}>{`+${amountUser - amountDisplay}`}</RestItem>
            </>
          )}
      {
        <div className={`${style['box-hover']} ${active ? style.active : ''}`} ref={boxHoverRef}>
          <div className={`${style['drop-down']} ${amountUser > 5 ? style.scroll : ''}`}>
            {listUser.map((item) => {
              return <UserDropdownItem user={item} key={item.id} onClick={openDetailMachine} />;
            })}
          </div>
        </div>
      }
    </div>
  ) : (
    <div className={style['manage-cell']}>
      <Text className={style['no-data']}>Không có nhân viên sở hữu nhóm quyền</Text>
    </div>
  );
}

//--------------- ManageCell of Table ----------------

type MachineType = {
  text: string;
  id: string;
};

type ManageCellProps = {
  listMachine: MachineType[];
};

export function ManageCell({ listMachine }: ManageCellProps) {
  const amountMachine: number = listMachine.length;
  const [active, setActive] = useState(false);
  const boxHoverRef = useRef<HTMLDivElement | null>(null);
  //------------ function see detail machine --------------------
  const openDetailMachine = () => {
    console.log('open');
  };
  //------------ function open dropdown --------------------
  const openDropdown = () => {
    console.log(boxHoverRef.current);
    setActive(true);
  };
  //------------ handle close dropdown ----------------
  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (e.target !== boxHoverRef.current && active) {
        setActive(false);
      }
    };
    addEventListener('click', closeDropdown);
    return () => {
      removeEventListener('click', closeDropdown);
    };
  }, [active]);
  return (
    <div className={style['manage-cell']}>
      {amountMachine <= 2 ? (
        listMachine.map((item) => {
          return <MachineItem machine={item} key={item.id} />;
        })
      ) : (
        <>
          <MachineItem machine={listMachine[0]} />
          <MachineItem machine={listMachine[1]} />
          <RestItem onClick={openDropdown}>{`+${amountMachine - 2}`}</RestItem>
        </>
      )}
      <div
        className={`${style['box-hover']} ${active ? style.active : ''} ${
          amountMachine > 5 ? style.scroll : ''
        }`}
        ref={boxHoverRef}
      >
        {listMachine.map((item) => {
          return <DropdownItem machine={item} key={item.id} onClick={openDetailMachine} />;
        })}
      </div>
    </div>
  );
}

//--------------- Machine Status Tag ----------------

type MachineStatusTagProps = {
  status: 'UNKNOWN' | 'IN_SERVICE' | 'OUT_OF_SERVICE' | 'OFFLINE';
};

const MachineStatusTagEnum = {
  UNKNOWN: 'UNKNOWN',
  IN_SERVICE: 'IN SERVICE',
  OUT_OF_SERVICE: 'OUT OF SERVICE',
  OFFLINE: 'OFFLINE',
};

export const MachineStatusTag = ({ status }: MachineStatusTagProps) => {
  switch (status) {
    case 'UNKNOWN':
      return (
        <div className={`${style['machine-status']} ${style.unknown}`}>
          <Text>{MachineStatusTagEnum[status]}</Text>
          <ExclamationCircleFilled
            style={{
              color: '#A8071A',
            }}
          />
        </div>
      );
    case 'IN_SERVICE':
      return (
        <div className={`${style['machine-status']} ${style['in-service']}`}>
          <Text>{MachineStatusTagEnum[status]}</Text>
          <ExclamationCircleFilled
            style={{
              color: '#A8071A',
            }}
          />
        </div>
      );
    case 'OUT_OF_SERVICE':
      return (
        <div className={`${style['machine-status']} ${style['out-of-service']}`}>
          <Text>{MachineStatusTagEnum[status]}</Text>
          <ExclamationCircleFilled
            style={{
              color: '#A8071A',
            }}
          />
        </div>
      );
    case 'OFFLINE':
      return (
        <div className={`${style['machine-status-custom']} ${style.offline}`}>
          <Text>{MachineStatusTagEnum[status]}</Text>
          <ExclamationCircleFilled
            style={{
              color: '#A8071A',
            }}
          />
        </div>
      );
    default:
      return (
        <div className={`${style['machine-status']} ${style.unknown}`}>
          <Text>{MachineStatusTagEnum[status]}</Text>
          <ExclamationCircleFilled
            style={{
              color: '#A8071A',
            }}
          />
        </div>
      );
  }
};
