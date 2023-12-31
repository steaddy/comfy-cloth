import React, {useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {FaCheck} from 'react-icons/fa'
import {useCartContext} from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({
                     product
                   }) => {
  const {addToCart} = useCartContext();
  const {
    id,
    stock,
    colors,
  } = product;

  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);


  const increase = () => {
    setAmount(oldAmount => {
      return oldAmount === stock ? oldAmount : oldAmount + 1
    })
  };

  const decrease = () => {
    setAmount(oldAmount => {
      return oldAmount === 1 ? oldAmount : oldAmount - 1
    })
  };

  return <Wrapper>
    <div className="colors">
      <span> colors: </span>
      <div>{
        colors.map((color, index) => {
          return (
            <button
              onClick={() => setMainColor(color)}
              className={`color-btn ${color === mainColor ? 'active' : ''}`}
              style={{backgroundColor: colors[index]}}
              key={index}
            >{color === mainColor ? <FaCheck/> : null}</button>
          );
        })
      }</div>
    </div>
    <div className="btn-container">
      <AmountButtons
        increase={increase}
        decrease={decrease}
        amount={amount}
      />
      <Link
        onClick={() => {
          addToCart(id, mainColor, amount, product);
        }}
        to='/cart'
        className='btn'
      >
        Add to cart
      </Link>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
