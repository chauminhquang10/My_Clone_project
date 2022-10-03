import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties//TableCell';
import { formatDate } from '@/utils';
import FilterComponent from '@/components/TableProperties/FilterComponent';
import type { Dispatch, SetStateAction } from 'react';

import { useIntl } from 'umi';

type ColumnProps = {
  setCurrentRow: (s: API.StmModelResponse) => void;
  setShowDetail: (s: boolean) => void;
  setParamFilter: Dispatch<SetStateAction<API.getListMachinesParams | undefined>>;
  paramFilter: API.getListMachinesParams | undefined;
};

type filterType = {
  id: number;
  text: string;
  value: string;
}[];

const filterTypeMachineList: filterType = [
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

function Column({ setCurrentRow, setShowDetail, setParamFilter, paramFilter }: ColumnProps) {
  const intl = useIntl();
  const columns: ProColumns<API.StmModelResponse>[] = [
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'configMachine_tableColumn_machineType',
          })}
        </HeadCell>
      ),
      dataIndex: 'machineType',
      render: (dom, entity) => {
        return (
          <TextCell
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </TextCell>
        );
      },
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
      align: 'left',
      title: intl.formatMessage({
        id: 'configMachine_tableColumn_machineSeries',
      }),
      dataIndex: 'name',
      render: (dom, entity) => {
        return (
          <TextCell
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
            position="left"
          >
            {dom}
          </TextCell>
        );
      },
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'configMachine_tableColumn_machineCreatedBy',
          })}
        </HeadCell>
      ),
      dataIndex: 'createdBy',
      render: (_, entity) => {
        const value = entity.createdBy?.staffId
          ? `${entity.createdBy?.staffId} - ${entity.createdBy?.name}`
          : entity.createdBy?.name;
        return <TextCell>{value}</TextCell>;
      },
      width: '240px',
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'tableColumn_createdDate',
          })}
        </HeadCell>
      ),
      dataIndex: 'createdAt',
      render: (dom) => {
        return <TextCell>{formatDate(dom as string)}</TextCell>;
      },
      width: '140px',
    },
  ];
  return columns;
}

export default Column;
