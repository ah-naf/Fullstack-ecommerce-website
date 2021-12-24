import React, { useEffect, useState } from "react";
import { BiFilter } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { Collapse, Text } from "@nextui-org/react";
import "./Filter.css";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {changeProductPerPage} from '../../store/paginationSlice'
import { sortProduct } from "../../store/productSlice";

export default function Filter() {
    const dispatch = useDispatch()
    const curPerPage = useSelector(state => state.pagination.productPerPage)
    const [showFilter, setShowFilter] = useState(false);

    const handleLinkClick = link => {
      window.location.href = link;
    }

    const handleSort = e => {
      e.preventDefault();
      dispatch(sortProduct(e.target.value))
    }

    const handleSelectChange = e => {
      e.preventDefault()
      localStorage.setItem('productPerPage', parseInt(e.target.value))
      dispatch(changeProductPerPage(localStorage.getItem('productPerPage')))
    }

    useEffect(() => {
      if(localStorage.getItem('productPerPage')) {
        dispatch(changeProductPerPage(localStorage.getItem('productPerPage')))
      }
    },[dispatch])

  return (
    <div className="filter-container">
      <button className="filter-btn" onClick={() => setShowFilter(!showFilter)}>
        <BiFilter className="filter-icon" />
        FILTER
      </button>
      <div className="sort-filter">
        <div className="sortby">
          <label htmlFor="sortby">SORT BY: </label>
          <select name="" id="sortby" onChange={handleSort}>
            <option value="default">Default</option>
            <option value="nameAsc">Name (A-Z)</option>
            <option value="nameDesc">Name (Z-A)</option>
            <option value="priceAsc">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
          </select>
        </div>
        <div className="itemShow">
          <label htmlFor="itemShow">SHOW: </label>
          <select name="" id="itemShow" onChange={handleSelectChange}>
            <option value="8" selected={curPerPage == 8 ? true: false}>8</option>
            <option value="12" selected={curPerPage == 12 ? true: false}>12</option>
            <option value="16" selected={curPerPage == 16 ? true: false}>16</option>
            <option value="20" selected={curPerPage == 20 ? true: false}>20</option>
          </select>
        </div>
      </div>
      <div className={`filter-sidebar ${showFilter && 'filter-show'}`}>
        <button className="filter-sidebar-close" onClick={() => setShowFilter(false)}>
          <MdOutlineClose className="close-icon" />
          CLOSE
        </button>
        <div className="menu-collapse">
          <Collapse.Group>
            <Collapse title="PRODUCT CATEGORIES" style={{ display: "block" }}>
              <Text>
                <ul>
                <li className="category-link">
                    <Link to={'/products'} onClick={() => handleLinkClick('/products')}>All</Link>
                  </li>
                  <li className="category-link">
                    <Link to={'/products?cat=men'} onClick={() => handleLinkClick('/products?cat=men')}>Men</Link>
                  </li>
                  <li className="category-link">
                  <Link to={'/products?cat=women'} onClick={() => handleLinkClick('/products?cat=women')}>Women</Link>
                  </li>
                  <li className="category-link">
                  <Link to={'/products?cat=boys'} onClick={() => handleLinkClick('/products?cat=boys')}>Boys</Link>
                  </li>
                  <li className="category-link">
                  <Link to={'/products?cat=girls'} onClick={() => handleLinkClick('/products?cat=girls')}>Girls</Link>
                  </li>
                  <li className="category-link">
                  <Link to={'/products?cat=accessories'} onClick={() => handleLinkClick('/products?cat=accessories')}>Accessories</Link>
                  </li>
                </ul>
              </Text>
            </Collapse>
            <Collapse title="FILTER BY PRICE" style={{ display: "block" }}>
              <Text>
                <ul>
                  <li className="category-link">
                  <Link to={'/products?price=50'} onClick={() => handleLinkClick('/products?pricel=0&&priceh=50')}>USD $0-$50</Link>
                  </li>
                  <li className="category-link">
                  <Link to={'/products?price=100'} onClick={() => handleLinkClick('/products?pricel=50&&priceh=100')}>USD $50-$100</Link>
                  </li>
                  <li className="category-link">
                  <Link to={'/products?price=150'} onClick={() => handleLinkClick('/products?pricel=100&&priceh=150')}>USD $100-$150</Link>
                  </li>
                  <li className="category-link">
                  <Link to={'/products?price=200'} onClick={() => handleLinkClick('/products?pricel=150&&priceh=200')}>USD $150-$200</Link>
                  </li>
                  <li className="category-link">
                  <Link to={'/products?price=250'} onClick={() => handleLinkClick('/products?pricel=200&&priceh=250')}>USD $200-$250</Link>
                  </li>
                </ul>
              </Text>
            </Collapse>
            <Collapse title="FILTER BY SIZE" style={{ display: "block" }}>
              <Text>
                <div className="size-filter-btn">
                  <Link to={'/products?size=m'}>M</Link>
                  <Link to={'/products?size=s'}>S</Link>
                  <Link to={'/products?size=l'}>L</Link>
                  <Link to={'/products?size=xl'}>XL</Link>
                  <Link to={'/products?size=xxl'}>XXL</Link>
                </div>
              </Text>
            </Collapse>
          </Collapse.Group>
        </div>
      </div>
    </div>
  );
}
