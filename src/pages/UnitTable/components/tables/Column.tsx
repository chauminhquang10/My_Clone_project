import type { ProColumns } from '@ant-design/pro-components';
import HeadCell from '@/components/TableProperties/HeadCell';
import { TextCell } from '@/components/TableProperties/TableCell';
import { formatDate } from '@/utils';
import { useIntl, useRequest } from 'umi';
import DateFilter from '@/components/TableProperties/DateFilter';
import FilterComponent from '@/components/TableProperties/FilterComponent';
import api from '@/services/STM-APIs';
import { useMemo } from 'react';

type ColumnProps = {
  setCurrentRow: (s: API.ManagementUnitResponse) => void;
  setShowDetail: (s: boolean) => void;
  setParamFilter: React.Dispatch<React.SetStateAction<API.getAllManagementUnitsParams | undefined>>;
  paramFilter: API.getAllManagementUnitsParams | undefined;
};

type filterType = {
  id: number;
  text: string;
  value: string;
}[];

const filterLocationList: filterType = [
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

type DistrictItem = {
  id: number;
  name: string;
};

type ListDistrictsResponse = {
  districts?: DistrictItem[];
};

type ResponseGetDistrictListByProvince = {
  code?: number | undefined;
  message?: string | undefined;
  data?: ListDistrictsResponse | undefined;
};

function Column({ setCurrentRow, setShowDetail, setParamFilter, paramFilter }: ColumnProps) {
  const intl = useIntl();
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
  const provinceFilter: filterType = useMemo(() => {
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

  const { data: districtsData, cancel: cancelDistricts } =
    useRequest<ResponseGetDistrictListByProvince>(
      () => {
        if (paramFilter?.provinceId)
          return api.LocationController.getDistricts({ provinceId: paramFilter?.provinceId });
        return new Promise(() => {
          cancelDistricts();
        });
      },
      {
        ready: paramFilter?.provinceId ? true : false,
        refreshDeps: [paramFilter?.provinceId],
      },
    );

  const districtFilter: filterType = useMemo(() => {
    if (districtsData?.districts)
      return districtsData?.districts?.map((item, index) => {
        return {
          id: index,
          text: item.name,
          value: `${item.id}`,
        };
      });
    else return [];
  }, [districtsData]);

  const columns: ProColumns<API.ManagementUnitResponse>[] = [
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'tableColumn_indexTitle',
          })}
        </HeadCell>
      ),
      render: (_, __, index) => {
        return <TextCell>{index + 1}</TextCell>;
      },
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_unitCode',
          })}
        </HeadCell>
      ),
      dataIndex: 'code',
      valueType: 'textarea',
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
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_unitName',
          })}
        </HeadCell>
      ),
      dataIndex: 'name',
      sorter: true,
      hideInForm: true,
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
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_location',
          })}
        </HeadCell>
      ),
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
      dataIndex: 'location',
      render: (dom) => {
        return <TextCell position="left">{dom}</TextCell>;
      },
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_province',
          })}
        </HeadCell>
      ),
      dataIndex: 'province',
      render: (_, entity) => {
        return <TextCell position="left">{entity.province?.name}</TextCell>;
      },
      filterDropdown: (e) => {
        return (
          <FilterComponent
            listFilter={provinceFilter}
            {...e}
            setParamFilter={(value) => {
              setParamFilter({ ...paramFilter, provinceId: Number(value) });
            }}
          />
        );
      },
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_district',
          })}
        </HeadCell>
      ),
      dataIndex: 'district',
      valueType: 'textarea',
      render: (_, entity) => {
        return <TextCell>{entity.district?.name}</TextCell>;
      },
      filterDropdown: (e) => {
        return (
          <FilterComponent
            listFilter={districtFilter}
            {...e}
            setParamFilter={(value) => {
              setParamFilter({ ...paramFilter, districtId: Number(value) });
            }}
          />
        );
      },
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_ward',
          })}
        </HeadCell>
      ),
      dataIndex: 'ward',
      valueType: 'textarea',
      render: (_, entity) => {
        // console.log(typeof dom);
        return <TextCell>{entity.ward?.name}</TextCell>;
      },
    },
    {
      title: (
        <HeadCell>
          {intl.formatMessage({
            id: 'managementUnit_tableColumn_address',
          })}
        </HeadCell>
      ),
      dataIndex: 'address',
      hideInForm: true,
      filters: true,
      onFilter: true,
      render: (dom) => {
        // console.log(typeof dom);
        return <TextCell>{dom}</TextCell>;
      },
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
      hideInForm: true,
      filterDropdown: (e) => {
        return (
          <DateFilter
            setDateFilter={(from: string | undefined, to: string | undefined) => {
              setParamFilter({
                ...paramFilter,
                from: from,
                to: to,
              });
            }}
            {...e}
          />
        );
      },
      render: (dom) => {
        // console.log(typeof dom);
        return <TextCell>{formatDate(dom as string)}</TextCell>;
      },
    },
  ];
  return columns;
}

export default Column;
