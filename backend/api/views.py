from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import load_data, filter_data
from collections import defaultdict

class FilteredDataView(APIView):
    def get(self, request):
        print("Received Filters:", request.query_params)

        data, categories = load_data()

        # Extract filters from query parameters
        filters = {
            'start_date': request.query_params.get('start_date'),
            'end_date': request.query_params.get('end_date'),
            'min_amount': request.query_params.get('min_amount'),
            'max_amount': request.query_params.get('max_amount'),
            'paytype_id': request.query_params.get('paytype_id'),
            'provider_id': request.query_params.get('provider_id'),
            'employee_type_id': request.query_params.get('employee_type_id'),
            'exclude_non_positive': request.query_params.get('exclude_non_positive') == 'true',
            'high_value_threshold': request.query_params.get('high_value_threshold'),
            'day_of_week': request.query_params.get('day_of_week'),
            'search_term': request.query_params.get('search_term'),
        }

        # Determine the response type
        response_type = request.query_params.get('type', 'filtered')  # Default to 'filtered'

        if response_type == 'raw':
            return Response(data, status=status.HTTP_200_OK)

        elif response_type == 'categories':
            return Response(categories, status=status.HTTP_200_OK)

        elif response_type == 'aggregates':
            # Extract group_by parameter
            group_by = request.query_params.get('group_by', 'paytype_id')  # Default to paytype_id
            valid_groupings = ['paytype_id', 'date', 'provider_id', 'employee_type_id']

            if group_by not in valid_groupings:
                return Response(
                    {'error': f"Invalid group_by value '{group_by}'. Must be one of {valid_groupings}."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Apply filters to data
            filtered_data = filter_data(data, filters)

            # Group and aggregate data
            aggregates = defaultdict(list)
            for entry in filtered_data:
                key = entry[group_by]
                aggregates[key].append(entry)

            # Prepare results with grouped attributes
            result = {
                key: {
                    "total_amount": sum(item['amount'] for item in group),
                    "records": group
                }
                for key, group in aggregates.items()
            }

            return Response(result, status=status.HTTP_200_OK)

        elif response_type == 'filtered':
            try:
                filtered_data = filter_data(data, filters)
                return Response(filtered_data, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(
                {'error': f"Invalid type '{response_type}'. Must be 'raw', 'categories', 'aggregates', or 'filtered'."},
                status=status.HTTP_400_BAD_REQUEST
            )
