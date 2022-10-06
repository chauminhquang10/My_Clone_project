import MachineStatusTag from '@/components/Common/MachineStatusTag';
import { TextCell } from '@/components/TableProperties//TableCell';
import FilterComponent from '@/components/TableProperties/FilterComponent';
import HeadCell from '@/components/TableProperties/HeadCell';
import type { ProColumns } from '@ant-design/pro-components';
import type { Dispatch, SetStateAction } from 'react';
import { useMemo } from 'react';
import { FormattedMessage, useRequest } from 'umi';
import api from '@/services/STM-APIs';
import { Typography } from 'antd';

type ColumnProps = {
  setCurrentRow: (s: API.StmInfoResponse) => void;
  setShowDetail: (s: boolean) => void;
  setParamFilter: Dispatch<SetStateAction<API.getListMachinesParams | undefined>>;
  paramFilter: API.getListMachinesParams | undefined;
};

type FilterType = {
  id: number;
  text: string;
  value: string;
}[];

//------------ Filter Location --------------------------------

const filterLocationList: FilterType = [
  {
    id: 1,
    text: 'Miền Bắc',
    value: 'north',
  },
  {
    id: 2,
    text: 'Miền Trung',
    value: 'middle',
  },
  {
    id: 3,
    text: 'Miền Nam',
    value: 'south',
  },
];

// const filterLocation = (value: string | number | boolean, record: API.StmInfoResponse) => {
//   return record.location?.includes(value as string) ? true : false;
// };

//------------ Filter Province --------------------------------

const filterTypeMachineList: FilterType = [
  {
    id: 1,
    text: 'ATM',
    value: 'ATM',
  },
  {
    id: 2,
    text: 'CDM',
    value: 'CDM',
  },
  {
    id: 3,
    text: 'STM',
    value: 'STM',
  },
];

//------------ Filter Status Machine --------------------------------

const filterStatusList: FilterType = [
  {
    id: 1,
    text: 'IN SERVICE',
    value: 'IN_SERVICE',
  },
  {
    id: 2,
    text: 'OUT OF SERVICE',
    value: 'OUT_OF_SERVICE',
  },
  {
    id: 3,
    text: 'OFFLINE',
    value: 'OFFLINE',
  },
];

type ProvinceItem = {
  id: number;
  name: string;
  location: string;
};

type ListProvincesResponse = {
  provinces?: ProvinceItem[];
};

type ResponseGetProvinceListByLocation = {
  code?: number | undefined;
  message?: string | undefined;
  data?: ListProvincesResponse | undefined;
};

function Column({ setShowDetail, setCurrentRow, setParamFilter, paramFilter }: ColumnProps) {
  const { data: provincesData, cancel: cancelProvinces } =
    useRequest<ResponseGetProvinceListByLocation>(
      () => {
        if (paramFilter?.location)
          return api.LocationController.getProvinces({ location: paramFilter.location });
        return new Promise(() => {
          cancelProvinces();
        });
      },
      {
        ready: paramFilter?.location ? true : false,
        refreshDeps: [paramFilter?.location],
      },
    );
  const provinceFilter: FilterType = useMemo(() => {
    if (provincesData?.provinces)
      return provincesData?.provinces?.map((item, index) => {
        return {
          id: index,
          text: item.name,
          value: `${item.id}`,
        };
      });
    else return [];
  }, [provincesData]);
  const columns: ProColumns<API.StmInfoResponse>[] = [
    {
      title: (
        <HeadCell>
          <FormattedMessage id="machine-table.numberof" />
        </HeadCell>
      ),
      dataIndex: 'id',
      render: (_, data, index) => {
        const stt = index + 1;

        return <TextCell>{stt}</TextCell>;
      },
      width: '80px',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="machineName" />
        </HeadCell>
      ),
      dataIndex: 'name',
      render: (dom, data) => {
        const handleClick = () => {
          setShowDetail(true);
          setCurrentRow(data);
        };
        return <TextCell onClick={handleClick}>{dom}</TextCell>;
      },
      sorter: (a, b) => {
        if (a.name && b.name) return a.name.localeCompare(b.name);
        else return 1;
      },
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="location" />
        </HeadCell>
      ),
      dataIndex: 'location',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      filterMultiple: false,
      filters: true,
      filterDropdown: (e) => {
        return (
          <FilterComponent
            listFilter={filterLocationList}
            {...e}
            setParamFilter={(value) => {
              setParamFilter({ ...paramFilter, location: value as string });
            }}
          />
        );
      },
      width: '140px',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="machine-table.province/city" />
        </HeadCell>
      ),
      dataIndex: 'province',
      render: (_, entity) => {
        return <TextCell>{entity.province?.name}</TextCell>;
      },
      width: '216px',
      filterMultiple: false,
      filters: true,
      filterDropdown: (e) => {
        return (
          <FilterComponent
            listFilter={provinceFilter}
            {...e}
            setParamFilter={(value) => {
              setParamFilter({ ...paramFilter, provinceId: value ? Number(value) : undefined });
            }}
          />
        );
      },
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="machineType" />
        </HeadCell>
      ),
      dataIndex: 'machineType',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      filterMultiple: false,
      filters: true,
      filterDropdown: (e) => {
        return (
          <FilterComponent
            listFilter={filterTypeMachineList}
            {...e}
            setParamFilter={(value) => {
              setParamFilter({
                ...paramFilter,
                machineType: value as 'UNKNOWN' | 'ATM' | 'CDM' | 'STM' | undefined,
              });
            }}
          />
        );
      },
      width: '140px',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="status" />
        </HeadCell>
      ),
      dataIndex: 'status',
      render: (_, entity) => {
        return (
          <MachineStatusTag
            type={entity?.status as 'UNKNOWN' | 'IN_SERVICE' | 'OUT_OF_SERVICE' | 'OFFLINE'}
          />
        );
      },
      width: '180px',
      filterMultiple: false,
      filters: true,
      filterDropdown: (e) => {
        return (
          <FilterComponent
            listFilter={filterStatusList}
            {...e}
            setParamFilter={(value) => {
              setParamFilter({
                ...paramFilter,
                status: value as
                  | 'UNKNOWN'
                  | 'IN_SERVICE'
                  | 'OUT_OF_SERVICE'
                  | 'OFFLINE'
                  | undefined,
              });
            }}
          />
        );
      },
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="machine-table.status-notes" />
        </HeadCell>
      ),
      dataIndex: 'activity',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="terminalId" />
        </HeadCell>
      ),
      dataIndex: 'terminalId',
      render: (dom) => {
        return <TextCell>{dom}</TextCell>;
      },
      width: '200px',
    },
    {
      title: (
        <HeadCell>
          <FormattedMessage id="ipAddress" />
        </HeadCell>
      ),
      dataIndex: 'ipAddress',
      render: (dom) => {
        return (
          <TextCell width="200px">
            <Typography.Text ellipsis={{ tooltip: dom }}>{dom}</Typography.Text>
          </TextCell>
        );
      },
      width: '200px',
    },
  ];
  return columns;
}

export default Column;
