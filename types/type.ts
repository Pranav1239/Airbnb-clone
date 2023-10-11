type CategoriesType = {
    name : any,
    icon : any,
}

type DateStateType = {
  startDate: Date;
  endDate: Date;
  key: string;
};

type SearchParamsType = {
  country: string;
  weeks: string;
};

type CountriesType = {
    label : string  | readonly string[] | undefined,
    value : string  | readonly string[] | undefined,
}

type HomesType = {
    id: any;
    price: any;
    title: any;
    image: any;
    city: any;
    state: any;
    country: any;
    description: any;
    user_id: any;
    created_at: any;
    users: {
      name: any;
    };
  };
  