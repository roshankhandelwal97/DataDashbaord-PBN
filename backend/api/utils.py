import json
import os
from datetime import datetime

def load_data():
    file_path = os.path.join(os.path.dirname(__file__), 'static', 'table.json')
    with open(file_path, 'r') as f:
        data = json.load(f)
    return data['values'], data['categories']

def filter_data(data, filters):
    # Apply filters one by one, ensuring "AND" logic
    filtered_data = data

    if filters.get('start_date'):
        start_date = datetime.strptime(filters['start_date'], "%Y-%m-%d").date()
        filtered_data = [
            d for d in filtered_data
            if datetime.strptime(d['date'], "%Y-%m-%d").date() >= start_date
        ]

    # Filter by end_date
    if filters.get('end_date'):
        end_date = datetime.strptime(filters['end_date'], "%Y-%m-%d").date()
        filtered_data = [
            d for d in filtered_data
            if datetime.strptime(d['date'], "%Y-%m-%d").date() <= end_date
        ]

    # Filter by minimum amount
    if filters.get('min_amount'):
        min_amount = float(filters['min_amount'])
        filtered_data = [
            d for d in filtered_data
            if d['amount'] >= min_amount
        ]

    # Filter by maximum amount
    if filters.get('max_amount'):
        max_amount = float(filters['max_amount'])
        filtered_data = [
            d for d in filtered_data
            if d['amount'] <= max_amount
        ]

    # Filter by paytype_id
    if filters.get('paytype_id'):
        paytype_ids = set(map(int, filters['paytype_id'].split(',')))
        filtered_data = [
            d for d in filtered_data
            if d['paytype_id'] in paytype_ids
        ]

    # Filter by provider_id
    if filters.get('provider_id'):
        provider_ids = set(filters['provider_id'].split(','))
        filtered_data = [
            d for d in filtered_data
            if d['provider_id'] in provider_ids
        ]

    # Filter by employee_type_id
    if filters.get('employee_type_id'):
        employee_type_ids = set(map(int, filters['employee_type_id'].split(',')))
        filtered_data = [
            d for d in filtered_data
            if d['employee_type_id'] in employee_type_ids
        ]

    # Exclude zero or negative amounts
    if filters.get('exclude_non_positive'):
        filtered_data = [
            d for d in filtered_data
            if d['amount'] > 0
        ]

    # High-value threshold filter
    if filters.get('high_value_threshold'):
        threshold = float(filters['high_value_threshold'])
        filtered_data = [
            d for d in filtered_data
            if d['amount'] > threshold
        ]

    # Filter by specific day of the week
    if filters.get('day_of_week'):
        day_of_week = filters['day_of_week'].lower()
        filtered_data = [
            d for d in filtered_data
            if datetime.strptime(d['date'], "%Y-%m-%d").strftime('%A').lower() == day_of_week
        ]

    # Search term filter
    if filters.get('search_term'):
        term = filters['search_term'].lower()
        filtered_data = [
            d for d in filtered_data
            if term in str(d['provider_id']).lower() or term in str(d['employee_type_id']).lower()
        ]

    return filtered_data
