import React, { useEffect, useRef, useState } from 'react';
import activeIcon from '@/assets/images/svg/icon/active-icon.svg';
import connectBoardIcon from '@/assets/images/svg/icon/connect-boards.svg';
import inactiveIcon from '@/assets/images/svg/icon/lock-icon.svg';
import style from './style.less';
import StatusTag from './StatusTag';
import { ExclamationCircleFilled } from '@ant-design/icons';

//--------------- TextCell of Table ----------------

type TextCellProps = {
  children: React.ReactNode | string;
  onClick?: () => void;
  blue?: boolean;
  position?: 'left' | 'right' | 'center';
};

export function TextCell({ children, onClick, blue, position }: TextCellProps) {
  return onClick ? (
    <div
      className={`${style['text-cell-click']} ${blue && style.blue}`}
      onClick={onClick}
      style={{
        textAlign: position ? position : 'center',
      }}
    >
      {children}
    </div>
  ) : (
    <div
      className={`${style['text-cell']} ${blue && style.blue}`}
      style={{
        textAlign: position ? position : 'center',
      }}
    >
      {children}
    </div>
  );
}

export enum UserCellStatus {
  ACTIVE,
  INACTIVE,
  UNKNOWN,
}

type UserStatusCellProps = {
  status: UserCellStatus;
};

export function UserStatusCell({ status }: UserStatusCellProps) {
  switch (status) {
    case UserCellStatus.ACTIVE:
      return (
        <StatusTag
          title="ĐANG HOẠT ĐỘNG"
          icon={<img src={activeIcon} alt="icon-active" />}
          type="ACTIVE"
        />
      );
    case UserCellStatus.INACTIVE:
      return (
        <StatusTag
          title="TẠM KHÓA"
          icon={<img src={inactiveIcon} alt="icon-inactive" />}
          type="INACTIVE"
        />
      );
    default:
      return (
        <StatusTag
          title="KHÔNG XÁC ĐỊNH"
          // icon UNKNOWN
          type="DEFAULT"
        />
      );
  }
}

//--------------- MachineItem of ManageCell ----------------

type MachineItemProps = {
  machine: MachineType;
};

function MachineItem({ machine }: MachineItemProps) {
  return <span className={style['machine-item']}>{`(${machine.text})`}</span>;
}

//--------------- RestItem of ManageCell ----------------

type RestItemProps = {
  children: string;
  onClick: () => void;
};

function RestItem({ children, onClick }: RestItemProps) {
  return (
    <span className={style['rest-item']} onClick={onClick}>
      {children}
    </span>
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
      <span className={style.text}>{machine.text}</span>
      <button className={style['detail-btn']}>
        <img className="detail-icon" src={connectBoardIcon} alt="" />
        <span className={style['detail-text']}>Chi tiết</span>
      </button>
    </div>
  );
}

//--------------- User Item Tag --------------------------------

type UserItemTagProps = {
  children: API.UserResponse;
};

export function UserItemTag({ children }: UserItemTagProps) {
  console.log(children);
  return (
    <div className={style['user-item-tag']}>
      <div className={style['img-box']}>
        <img className={style.avatar} src={children.avatar} alt="no-image" />
      </div>
      <p className={style['user-name']}>{children.name}</p>
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
      <div className={style['img-box']}>
        <img src={user.avatar} className={style.avatar} alt="no-image" />
      </div>
      <p className={style['user-name']}>{user.name}</p>
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
  return (
    <div className={style['manage-cell']}>
      {amountUser && amountUser <= amountDisplay
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
      {amountUser && (
        <div className={`${style['box-hover']} ${active ? style.active : ''}`} ref={boxHoverRef}>
          <div className={`${style['drop-down']} ${amountUser > 5 ? style.scroll : ''}`}>
            {listUser.map((item) => {
              return <UserDropdownItem user={item} key={item.id} onClick={openDetailMachine} />;
            })}
          </div>
        </div>
      )}
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
          <p>{MachineStatusTagEnum[status]}</p>
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
          <p>{MachineStatusTagEnum[status]}</p>
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
          <p>{MachineStatusTagEnum[status]}</p>
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
          <p>{MachineStatusTagEnum[status]}</p>
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
          <p>{MachineStatusTagEnum[status]}</p>
          <ExclamationCircleFilled
            style={{
              color: '#A8071A',
            }}
          />
        </div>
      );
  }
};
