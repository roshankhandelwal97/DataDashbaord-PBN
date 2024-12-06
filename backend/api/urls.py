from django.urls import path
from .views import FilteredDataView

urlpatterns = [
    # path('data/', RawDataView.as_view(), name='raw-data'),
    # path('categories/', CategoriesView.as_view(), name='categories'),
    # path('aggregates/', AggregatesView.as_view(), name='aggregates'),
    path('filtered-data/', FilteredDataView.as_view(), name='filtered-data'),

]
