import * as React from 'react';
import * as DebounceInput from 'react-debounce-input';
import { SearchInputProps } from '../interfaces';
import { AirportWithId } from '../../../types';
import { findDOMNode } from 'react-dom';
import './styles.css';

class SearchInput extends React.Component<SearchInputProps, any>  {
    createRow(airport: AirportWithId, index: number) {
        let li;
        if (this.props.currentIndex === index) {
            li =
                <li
                    onClick={() => this.props.selectAirport(airport)}
                    className="list-group-item suggestions suggestions-active"
                    key={airport.id}
                >
                    {airport.code} - {airport.name}
                </li>;
        } else {
            li =
                <li
                    onClick={() => this.props.selectAirport(airport)}
                    className="list-group-item suggestions"
                    key={airport.id}
                >
                    {airport.code} - {airport.name}
                </li>;
        }
        return (
            <div ref={index.toString()} key={airport.id}>
                {li}
            </div>
        );
    }

    isElementInViewport = (el: any) => {

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    handelKeyPreses = (e: any) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            if (e.key === 'ArrowDown') {
                this.props.keyPressScroll(e.key);
                let nextEl = this.props.currentIndex + 1;
                let li = findDOMNode(this.refs[nextEl.toString()]);
                if (li) {
                    li.scrollIntoView();
                }
            } else {
                this.props.keyPressScroll(e.key);
                let nextEl = this.props.currentIndex - 1;
                let li = findDOMNode(this.refs[nextEl.toString()]);
                if (li) {
                    li.scrollIntoView();
                }
            }
        }

        if (e.key === 'Enter') {
            let currentAirport = this.props.airports.find((a, index) => index === this.props.currentIndex);
            if (currentAirport) {
                this.props.selectAirport(currentAirport);
            }
        }
    }

    render() {
        return (
            <div>
                <DebounceInput
                    onKeyUp={this.handelKeyPreses}
                    list="airports"
                    className="form-control"
                    placeholder="IATA, City, Name..."
                    value={this.props.value}
                    minLength={1}
                    debounceTimeout={250}
                    onChange={this.props.changeHandler}
                />
                <ul ref="list" className="suggestions-container list-group">
                    {this.props.airports.map((a, index) => this.createRow(a, index))}
                </ul>
            </div>
        );
    }
}

export default SearchInput;