import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


export default function useProducts() {
    async function getAllProducts() {
        const options = {
          url: "https://ecommerce.routemisr.com/api/v1/products",
          method: "GET",
        }
        return axios.request(options);
      }
      let response = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
        //options
        refetchOnMount:true,
        staleTime: 5000,
        gcTime: 9000,
        refetchOnWindowFocus:false,
        retry: 5,
        retryDelay: 2000,
      });
      return response;
}
