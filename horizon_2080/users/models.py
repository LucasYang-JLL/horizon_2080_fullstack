from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.contenttypes.models import ContentType
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from .conf import settings
from .managers import UserInheritanceManager, UserManager


class AbstractUser(AbstractBaseUser, PermissionsMixin):
    USERS_AUTO_ACTIVATE = not settings.USERS_VERIFY_EMAIL

    email = models.EmailField(
        _('email address'), max_length=255, unique=True, db_index=True)
    is_staff = models.BooleanField(
        _('staff status'), default=False,
        help_text=_('Designates whether the user can log into this admin site.'))

    is_active = models.BooleanField(
        _('active'), default=USERS_AUTO_ACTIVATE,
        help_text=_('Designates whether this user should be treated as '
                    'active. Unselect this instead of deleting accounts.'))
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now, null=True)
    user_type = models.ForeignKey(ContentType, null=True, editable=False, on_delete=models.CASCADE)

    objects = UserInheritanceManager()
    base_objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        abstract = True

    def get_full_name(self):
        """ Return the email."""
        return self.email

    def get_short_name(self):
        """ Return the email."""
        return self.email

    def email_user(self, subject, message, from_email=None):
        """ Send an email to this User."""
        send_mail(subject, message, from_email, [self.email])

    def activate(self):
        self.is_active = True
        self.save()

    def save(self, *args, **kwargs):
        if not self.user_type_id:
            self.user_type = ContentType.objects.get_for_model(self, for_concrete_model=False)
        super(AbstractUser, self).save(*args, **kwargs)


class User(AbstractUser):
    name = models.CharField(max_length=255, default=None, null=True)
    cellphone = models.CharField(max_length=255, default=None,null=True)
    workphone = models.CharField(max_length=255, default=None, null=True)
    title = models.CharField(max_length=255, default=None, null=True)
    department = models.CharField(max_length=255, default=None, null=True)
    status = models.BooleanField(default=True)
    emailable = models.BooleanField(default=True)
    city = models.CharField(max_length=255, default=None, null=True)
    report_to = models.ManyToManyField("self", symmetrical=False, blank=True, related_name="report_to_me")
    give_action_to = models.ManyToManyField("self", symmetrical=False, blank=True, related_name='own_action_from')
    class Meta(AbstractUser.Meta):
        swappable = 'AUTH_USER_MODEL'
    
    def __str__(self):
        return self.email

# class Manager(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     manager = models.ManyToManyField("self", blank=True)

# class Employee(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     manager = models.ManyToManyField("self", blank=True)