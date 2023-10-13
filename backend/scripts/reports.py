from accounts.models import Mentors

def prepare_response(action, data):
    def handle_get_accounts(accounts):
        all_accounts = []
        for acc in [account.split(',') for account in accounts.split('\n')]:
            if len(acc) > 1 and "Account Id" not in acc:
                accId, user, *rest = acc
                accName, *name = user.split()
                name = ' '.join(name)
                all_accounts.append((accId, accName, name))    
        return all_accounts

    map_actions = {
        'login': lambda x: x,
        'accounts': lambda x: handle_get_accounts(x),
    }

    new_data = data
    if action in map_actions.keys():
        new_data = map_actions[action](data)
    return new_data

def get_trainees_pk(pk):
    return [trainee.pk for trainee in Mentors.objects.get(user=pk).trainees.all()]
